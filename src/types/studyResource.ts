
export interface StudyResource {
  id: number;
  title: string;
  type: string;
  subject: string;
  uploadedBy: string;
  downloadCount: number;
  size?: string;
  duration?: string;
  uploadDate: string;
}
