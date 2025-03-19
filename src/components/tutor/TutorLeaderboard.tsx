
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Trophy, Medal, Star, Search, Filter, Award } from 'lucide-react';
import AnimatedAvatar from '@/components/ui/avatar-animated';
import { Tutor } from '@/types/tutor';

interface TutorLeaderboardProps {
  tutors: Tutor[];
}

const TutorLeaderboard: React.FC<TutorLeaderboardProps> = ({ tutors }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'level' | 'rating' | 'reviews'>('level');
  const [filterSpecialty, setFilterSpecialty] = useState<string>('all');

  // Get unique specialties from tutors
  const specialties = Array.from(new Set(tutors.map(tutor => tutor.specialty)));
  
  // Filter and sort tutors
  const filteredTutors = tutors
    .filter(tutor => {
      const matchesSearch = tutor.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            tutor.specialty.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSpecialty = filterSpecialty === 'all' || tutor.specialty === filterSpecialty;
      return matchesSearch && matchesSpecialty;
    })
    .sort((a, b) => {
      if (sortBy === 'level') return b.level - a.level;
      if (sortBy === 'rating') return b.rating - a.rating;
      return b.reviews - a.reviews;
    });

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Trophy className="mr-2 h-5 w-5 text-yellow-500" />
            Tutor Leaderboard
          </CardTitle>
          <CardDescription>
            Our top-performing volunteer tutors ranked by experience, ratings, and sessions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
            <div className="relative w-full md:w-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search tutors..." 
                className="pl-9 w-full md:w-[250px]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <Select value={filterSpecialty} onValueChange={setFilterSpecialty}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="All Specialties" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Specialties</SelectItem>
                  {specialties.map((specialty) => (
                    <SelectItem key={specialty} value={specialty}>{specialty}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={(value: 'level' | 'rating' | 'reviews') => setSortBy(value)}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="level">Experience Level</SelectItem>
                  <SelectItem value="rating">Rating</SelectItem>
                  <SelectItem value="reviews">Sessions Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {filteredTutors.length > 0 ? (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]">Rank</TableHead>
                    <TableHead>Tutor</TableHead>
                    <TableHead>Specialty</TableHead>
                    <TableHead className="text-center">Level</TableHead>
                    <TableHead className="text-center">Rating</TableHead>
                    <TableHead className="text-center">Sessions</TableHead>
                    <TableHead>Badges</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTutors.map((tutor, index) => (
                    <TableRow key={tutor.id}>
                      <TableCell className="font-medium">
                        {index === 0 ? (
                          <Trophy className="h-5 w-5 text-yellow-500" />
                        ) : index === 1 ? (
                          <Medal className="h-5 w-5 text-gray-400" />
                        ) : index === 2 ? (
                          <Medal className="h-5 w-5 text-amber-700" />
                        ) : (
                          <span className="text-muted-foreground">{index + 1}</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <AnimatedAvatar fallback={tutor.avatar} size="sm" />
                          <div>
                            <p className="font-medium">{tutor.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {tutor.status === 'available' ? (
                                <span className="text-green-500">● Available Now</span>
                              ) : tutor.status === 'busy' ? (
                                <span className="text-orange-500">● Busy</span>
                              ) : (
                                <span className="text-blue-500">● Scheduled</span>
                              )}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{tutor.specialty}</TableCell>
                      <TableCell className="text-center">
                        <div className="flex items-center justify-center">
                          <span className="bg-primary/10 text-primary rounded-full px-2 py-1 text-xs font-bold">
                            Lvl {tutor.level}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex items-center justify-center">
                          <Star className="h-4 w-4 text-yellow-500 mr-1" />
                          <span>{tutor.rating.toFixed(1)}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">{tutor.reviews}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {tutor.badges.slice(0, 2).map((badge, idx) => (
                            <Badge key={idx} variant="outline" className="flex items-center">
                              <Award className="h-3 w-3 mr-1" />
                              {badge}
                            </Badge>
                          ))}
                          {tutor.badges.length > 2 && (
                            <Badge variant="outline">+{tutor.badges.length - 2}</Badge>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-muted-foreground">No tutors found matching your criteria</p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => {
                  setSearchTerm('');
                  setFilterSpecialty('all');
                }}
              >
                Reset Filters
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Leaderboard Stats</CardTitle>
          <CardDescription>Key statistics for our top volunteer tutors</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-primary/5 rounded-lg p-4 text-center">
              <p className="text-sm text-muted-foreground mb-1">Total Tutors</p>
              <p className="text-3xl font-bold">{tutors.length}</p>
            </div>
            <div className="bg-primary/5 rounded-lg p-4 text-center">
              <p className="text-sm text-muted-foreground mb-1">Avg. Rating</p>
              <p className="text-3xl font-bold flex justify-center items-center">
                {(tutors.reduce((sum, tutor) => sum + tutor.rating, 0) / tutors.length).toFixed(1)}
                <Star className="h-5 w-5 text-yellow-500 ml-1" />
              </p>
            </div>
            <div className="bg-primary/5 rounded-lg p-4 text-center">
              <p className="text-sm text-muted-foreground mb-1">Total Sessions</p>
              <p className="text-3xl font-bold">
                {tutors.reduce((sum, tutor) => sum + tutor.reviews, 0)}
              </p>
            </div>
            <div className="bg-primary/5 rounded-lg p-4 text-center">
              <p className="text-sm text-muted-foreground mb-1">Available Now</p>
              <p className="text-3xl font-bold">
                {tutors.filter(tutor => tutor.status === 'available').length}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TutorLeaderboard;
