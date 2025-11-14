import { ArtObject, DepartmentObjects, DepartmentDetails } from './types';

// Base URL for the Met API
const MET_API_BASE = 'https://collectionapi.metmuseum.org/public/collection/v1';

/**
 * Fetches data for a given department, randomly selects IDs, and fetches full details.
 * @param departmentId ID of the department (e.g., 6 for European Sculpture)
 * @param count Number of random objects to fetch
 * @returns An array of ArtObject and the department's name, or an Error object.
 */
export async function getArtData(departmentId: number, count: number): Promise<{ objects: ArtObject[]; departmentName: string }> {
  try {
    // 1. Fetch Department Details (to get the display name)
    const deptResponse = await fetch(`${MET_API_BASE}/departments`);
    if (!deptResponse.ok) {
        throw new Error(`HTTP error fetching departments! Status: ${deptResponse.status}`);
    }
    const departmentsData: { departments: DepartmentDetails[] } = await deptResponse.json();
    const departmentInfo = departmentsData.departments.find(d => d.departmentId === departmentId);
    if (!departmentInfo) {
        throw new Error(`Department ID ${departmentId} not found.`);
    }
    const departmentName = departmentInfo.displayName;

    // 2. Fetch all Object IDs for the specified department
    const objectsResponse = await fetch(`${MET_API_BASE}/objects?departmentIds=${departmentId}`);
    if (!objectsResponse.ok) {
      throw new Error(`HTTP error fetching object IDs! Status: ${objectsResponse.status}`);
    }
    const objectsData: DepartmentObjects = await objectsResponse.json();
    const allObjectIDs = objectsData.objectIDs || [];

    if (allObjectIDs.length === 0) {
      return { objects: [], departmentName };
    }

    // 3. Select 'count' random IDs
    const maxCount = Math.min(count, allObjectIDs.length);
    const randomIDs: number[] = [];
    
    // Simple random selection without replacement
    for (let i = 0; i < maxCount; i++) {
        const randomIndex = Math.floor(Math.random() * allObjectIDs.length);
        randomIDs.push(allObjectIDs.splice(randomIndex, 1)[0]);
    }

    // 4. Fetch details for each randomly selected ID concurrently
    const detailPromises = randomIDs.map(id => 
      fetch(`${MET_API_BASE}/objects/${id}`).then(res => res.json())
    );

    const artObjects = (await Promise.all(detailPromises))
        .filter((obj: ArtObject) => obj.primaryImage) // Only keep objects with an image
        .slice(0, count); // Ensure we return exactly 'count' or less

    return { objects: artObjects as ArtObject[], departmentName };

  } catch (error) {
    console.error("Error fetching Met Art data:", error);
    // Re-throw a simplified error for the component to catch
    throw new Error(`Failed to fetch art data: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}