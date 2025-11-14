export interface ArtObject {
  objectID: number;
  title: string;
  artistDisplayName: string;
  primaryImage: string; // URL of the main image
  objectDate: string;   // Example of an extra property
  medium: string;       // Example of an extra property
  department: string;   // Example of an extra property
  // Add other properties you want to display (e.g., culture, period)
  culture?: string;
  period?: string;
}

// Type for the data structure returned by the initial objects endpoint
export interface DepartmentObjects {
  total: number;
  objectIDs: number[]; // Array of IDs
}

// Type for the data structure returned by the Departments endpoint
export interface DepartmentDetails {
  departmentId: number;
  displayName: string;
}

export interface ArtResponse {
  objects: ArtObject[];
  departmentName: string;
}