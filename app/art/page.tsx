// app/art/page.tsx

import React from 'react';
import { getArtData } from './data';
// --- 1. Define Types ---

// Type for the full art object details returned from the Met API
interface ArtObject {
  objectID: number;
  title: string;
  artistDisplayName: string;
  primaryImage: string; // URL of the main image
  objectDate: string;   // Required extra property 1
  medium: string;       // Required extra property 2
  department: string;   // Required extra property 3
  culture?: string;     // Optional extra property 4
  period?: string;      // Optional extra property 5
}

// Type for the overall successful return value
interface ArtResponse {
  objects: ArtObject[];
  departmentName: string;
}

// Base URL for the Met API
const MET_API_BASE = 'https://collectionapi.metmuseum.org/public/collection/v1';-

/**
 * Fetches data for a given department, randomly selects IDs, and fetches full details.
 * @param departmentId ID of the department (e.g., '6' for Asian Art)
 * @param count Number of random objects to fetch
 * @returns An ArtResponse object containing the art array and department name.
 */
async function getArtData(departmentId: string, count: number): Promise<ArtResponse> {
  const departmentIdNum = parseInt(departmentId);
  
  try {
    // 1. Fetch Department Details (to get the display name)
    const deptResponse = await fetch(`${MET_API_BASE}/departments`);
    if (!deptResponse.ok) {
        throw new Error(`HTTP error fetching departments! Status: ${deptResponse.status}`);
    }
    const departmentsData: { departments: { departmentId: number; displayName: string }[] } = await deptResponse.json();
    const departmentInfo = departmentsData.departments.find(d => d.departmentId === departmentIdNum);
    if (!departmentInfo) {
        throw new Error(`Department ID ${departmentId} not found.`);
    }
    const departmentName = departmentInfo.displayName;

    // 2. Fetch all Object IDs for the specified department
    const objectsResponse = await fetch(`${MET_API_BASE}/objects?departmentIds=${departmentId}`);
    if (!objectsResponse.ok) {
      throw new Error(`HTTP error fetching object IDs! Status: ${objectsResponse.status}`);
    }
    const objectsData: { total: number; objectIDs: number[] } = await objectsResponse.json();
    const allObjectIDs = objectsData.objectIDs || [];

    if (allObjectIDs.length === 0) {
      return { objects: [], departmentName };
    }

    // 3. Select 'count' random IDs
    const maxCount = Math.min(count, allObjectIDs.length);
    const randomIDs: number[] = [];
    
    // Random selection without replacement
    for (let i = 0; i < maxCount; i++) {
        const randomIndex = Math.floor(Math.random() * allObjectIDs.length);
        randomIDs.push(allObjectIDs.splice(randomIndex, 1)[0]);
    }

    // 4. Fetch details for each randomly selected ID concurrently
    const detailPromises = randomIDs.map(id => 
      fetch(`${MET_API_BASE}/objects/${id}`).then(res => {
        if (!res.ok) throw new Error(`Failed to fetch object ${id}`);
        return res.json();
      })
    );

    // Wait for all detail fetches to complete, allowing individual failures
    const rawArtObjects = await Promise.allSettled(detailPromises);
    
    // Filter out failures and objects without a primary image
    const artObjects: ArtObject[] = rawArtObjects
      .filter(res => res.status === 'fulfilled')
      .map(res => (res as PromiseFulfilledResult<ArtObject>).value)
      .filter(obj => obj.primaryImage && obj.title) as ArtObject[];

    return { objects: artObjects, departmentName };
    
  } catch (error) {
    // Re-throw a simplified error for the component to catch
    throw new Error(`Failed to fetch art data: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

import styles from './Art.module.css';

interface ArtCardProps {
  art: ArtObject;
}

const ArtCard: React.FC<ArtCardProps> = ({ art }) => {
  return (
    <div className={styles.card}>
      {art.primaryImage && (
        <img 
          src={art.primaryImage} 
          alt={art.title} 
          className={styles.image}
        />
      )}
      <div className={styles.details}>
        <h3 className={styles.title}>{art.title}</h3>
        <p className={styles.artist}>Artist: {art.artistDisplayName || 'Unknown'}</p>
        
        {/* --- 3 REQUIRED EXTRA PROPERTIES --- */}
        <p><strong>Department:</strong> {art.department}</p>
        <p><strong>Medium:</strong> {art.medium}</p>
        <p><strong>Date:</strong> {art.objectDate}</p>
        {/* Optional Properties: */}
        {art.culture && <p><strong>Culture:</strong> {art.culture}</p>}
        
      </div>
    </div>
  );
};


const TARGET_DEPARTMENT_ID = 6;
const OBJECT_COUNT = 8;

export default async function ArtPage() {
  let artData: ArtResponse = { objects: [], departmentName: '' };
  let error: string | null = null;

  try {
    // Data fetching happens on the server before rendering
    artData = await getArtData(TARGET_DEPARTMENT_ID, OBJECT_COUNT);
  } catch (e) {
    error = e instanceof Error ? e.message : "An unexpected error occurred. Check server logs.";
  }

  return (
    <div className={styles.container}>
      
      {/* Display the department name */}
      <h1 className={styles.header}>
        {artData.departmentName || "Metropolitan Museum of Art"} Collection
      </h1>

      {/* Error Handling */}
      {error && (
        <div className={styles.errorBox}>
          <h2>Error Loading Art!</h2>
          <p>{error}</p>
        </div>
      )}

      {/* Render Art List */}
      <div className={styles.grid}>
        {artData.objects.length > 0 ? (
          artData.objects.map(art => (
            <ArtCard key={art.objectID} art={art} />
          ))
        ) : (
          !error && <p className={styles.message}>No art objects found for department {TARGET_DEPARTMENT_ID}.</p>
        )}
      </div>
    </div>
  );
}