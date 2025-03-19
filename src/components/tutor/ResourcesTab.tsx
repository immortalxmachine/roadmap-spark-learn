
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { BookOpen, Video, FileText, Upload, Search } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { subjects } from '@/data/subjects';
import { StudyResource } from '@/types/studyResource';

interface ResourcesTabProps {
  studyResources: StudyResource[];
}

const ResourcesTab: React.FC<ResourcesTabProps> = ({ studyResources }) => {
  const [resourceTitle, setResourceTitle] = useState('');
  const [resourceSubject, setResourceSubject] = useState('');
  const [resourceType, setResourceType] = useState('');
  const [resourceDescription, setResourceDescription] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [subjectFilter, setSubjectFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const { toast } = useToast();
  
  // Filtered resources based on search and filters
  const filteredResources = studyResources.filter(resource => {
    const matchesSearch = searchQuery === '' || 
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.uploadedBy.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesSubject = subjectFilter === 'all' || resource.subject.toLowerCase() === subjectFilter.toLowerCase();
    const matchesType = typeFilter === 'all' || resource.type.toLowerCase() === typeFilter.toLowerCase();
    
    return matchesSearch && matchesSubject && matchesType;
  });
  
  // Handle resource upload
  const handleUploadResource = () => {
    if (!resourceTitle || !resourceSubject || !resourceType) {
      toast({
        title: "Missing information",
        description: "Please fill out all required fields to upload a resource.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Resource uploaded!",
      description: "Your study material has been successfully uploaded.",
    });
    
    // Reset form
    setResourceTitle('');
    setResourceSubject('');
    setResourceType('');
    setResourceDescription('');
    setIsPublic(false);
  };
  
  // Handle resource preview
  const handlePreviewResource = (resource: StudyResource) => {
    toast({
      title: "Opening preview",
      description: `Previewing ${resource.title}`,
    });
    
    // In a real application, this would open a preview modal or redirect to a preview page
  };
  
  // Handle resource download
  const handleDownloadResource = (resource: StudyResource) => {
    toast({
      title: "Downloading resource",
      description: `Downloading ${resource.title}`,
    });
    
    // In a real application, this would trigger the download
  };
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BookOpen className="mr-2 h-5 w-5" />
              Study Resources
            </CardTitle>
            <CardDescription>
              Access study materials shared by tutors
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search resources..." 
                  className="pl-9 w-60"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex space-x-2">
                <Select value={subjectFilter} onValueChange={setSubjectFilter}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="All Subjects" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Subjects</SelectItem>
                    {subjects.map((subject) => (
                      <SelectItem key={subject.value} value={subject.value}>
                        {subject.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="All Types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="pdf">PDF Documents</SelectItem>
                    <SelectItem value="video">Videos</SelectItem>
                    <SelectItem value="audio">Audio</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-4">
              {filteredResources.length > 0 ? (
                filteredResources.map((resource) => (
                  <Card key={resource.id}>
                    <CardContent className="p-4">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-start space-x-4">
                          <div className={`rounded-md p-3 ${
                            resource.type === 'PDF' ? 'bg-red-100 text-red-600' : 
                            resource.type === 'Video' ? 'bg-blue-100 text-blue-600' : 
                            'bg-green-100 text-green-600'
                          }`}>
                            {resource.type === 'PDF' ? (
                              <FileText className="h-6 w-6" />
                            ) : resource.type === 'Video' ? (
                              <Video className="h-6 w-6" />
                            ) : (
                              <BookOpen className="h-6 w-6" />
                            )}
                          </div>
                          <div>
                            <h3 className="font-medium">{resource.title}</h3>
                            <p className="text-sm text-muted-foreground mb-1">
                              {resource.subject} • {resource.uploadedBy}
                            </p>
                            <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                              <span>Uploaded: {resource.uploadDate}</span>
                              <span>{resource.downloadCount} downloads</span>
                              {resource.size && <span>Size: {resource.size}</span>}
                              {resource.duration && <span>Duration: {resource.duration}</span>}
                            </div>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handlePreviewResource(resource)}
                          >
                            <BookOpen className="mr-2 h-4 w-4" />
                            Preview
                          </Button>
                          <Button 
                            size="sm"
                            onClick={() => handleDownloadResource(resource)}
                          >
                            Download
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="p-8 text-center">
                  <p className="text-muted-foreground">No resources found matching your criteria.</p>
                  <Button 
                    variant="outline" 
                    className="mt-4"
                    onClick={() => {
                      setSearchQuery('');
                      setSubjectFilter('all');
                      setTypeFilter('all');
                    }}
                  >
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="lg:col-span-1">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Upload Resource</CardTitle>
            <CardDescription>
              Share your study materials with others
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Resource Title</Label>
                <Input 
                  id="title" 
                  placeholder="Enter a descriptive title"
                  value={resourceTitle}
                  onChange={(e) => setResourceTitle(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Select value={resourceSubject} onValueChange={setResourceSubject}>
                  <SelectTrigger id="subject">
                    <SelectValue placeholder="Select subject" />
                  </SelectTrigger>
                  <SelectContent>
                    {subjects.map((subject) => (
                      <SelectItem key={subject.value} value={subject.value}>
                        {subject.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="resource-type">Resource Type</Label>
                <Select value={resourceType} onValueChange={setResourceType}>
                  <SelectTrigger id="resource-type">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="document">Document (PDF, DOC)</SelectItem>
                    <SelectItem value="video">Video</SelectItem>
                    <SelectItem value="audio">Audio</SelectItem>
                    <SelectItem value="link">External Link</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  placeholder="Describe what this resource contains or how it helps"
                  value={resourceDescription}
                  onChange={(e) => setResourceDescription(e.target.value)}
                />
              </div>
              
              <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center text-center">
                <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                <p className="text-sm font-medium">Drag and drop your file here</p>
                <p className="text-xs text-muted-foreground mb-2">or</p>
                <Button variant="outline" size="sm">
                  Browse Files
                </Button>
                <p className="text-xs text-muted-foreground mt-2">
                  Max file size: 50MB
                </p>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="public-resource" 
                  checked={isPublic}
                  onCheckedChange={(checked) => setIsPublic(checked === true)}
                />
                <Label htmlFor="public-resource" className="text-sm">
                  Make this resource public for all students
                </Label>
              </div>
              
              <Button 
                className="w-full"
                onClick={handleUploadResource}
              >
                Upload Resource
              </Button>
            </form>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Popular Resources</CardTitle>
            <CardDescription>
              Most downloaded materials this month
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {studyResources
                .sort((a, b) => b.downloadCount - a.downloadCount)
                .slice(0, 3)
                .map((resource, idx) => (
                  <div key={resource.id} className="flex items-start space-x-3">
                    <div className={`rounded-md p-2 ${
                      resource.type === 'PDF' ? 'bg-red-100 text-red-600' : 
                      resource.type === 'Video' ? 'bg-blue-100 text-blue-600' : 
                      'bg-green-100 text-green-600'
                    }`}>
                      {resource.type === 'PDF' ? (
                        <FileText className="h-4 w-4" />
                      ) : resource.type === 'Video' ? (
                        <Video className="h-4 w-4" />
                      ) : (
                        <BookOpen className="h-4 w-4" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-medium">{resource.title}</h3>
                      <p className="text-xs text-muted-foreground">{resource.subject}</p>
                    </div>
                    <Badge variant="secondary">{resource.downloadCount}</Badge>
                  </div>
                ))}
              <Button variant="link" className="w-full">View All Resources</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ResourcesTab;
