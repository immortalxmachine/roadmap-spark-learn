
import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Award, Trophy, Flame, Star, Gift, Users, CheckCircle, TrendingUp, Clock } from 'lucide-react';
import FadeIn from '@/components/animations/FadeIn';
import AnimatedAvatar from '@/components/ui/avatar-animated';

const Gamification = () => {
  const achievements = [
    {
      id: 1,
      title: "Fast Learner",
      description: "Complete 5 study sessions in a single day",
      icon: TrendingUp,
      progress: 100,
      unlocked: true,
      date: "Oct 10, 2023",
      xp: 100,
      color: "text-green-600",
      bgColor: "bg-green-100"
    },
    {
      id: 2,
      title: "Physics Master",
      description: "Score above 90% in 3 consecutive physics tests",
      icon: Star,
      progress: 100,
      unlocked: true,
      date: "Oct 5, 2023",
      xp: 150,
      color: "text-purple-600",
      bgColor: "bg-purple-100"
    },
    {
      id: 3,
      title: "Consistency Champion",
      description: "Maintain a 14-day study streak",
      icon: Flame,
      progress: 100,
      unlocked: true,
      date: "Sep 28, 2023",
      xp: 200,
      color: "text-amber-600",
      bgColor: "bg-amber-100"
    },
    {
      id: 4,
      title: "All-Rounder",
      description: "Complete at least one mock test in each subject",
      icon: Award,
      progress: 75,
      unlocked: false,
      xp: 250,
      color: "text-blue-600",
      bgColor: "bg-blue-100"
    },
    {
      id: 5,
      title: "Quiz Champion",
      description: "Win 10 daily quizzes",
      icon: Trophy,
      progress: 40,
      unlocked: false,
      xp: 300,
      color: "text-rose-600",
      bgColor: "bg-rose-100"
    },
    {
      id: 6,
      title: "Time Optimizer",
      description: "Complete 3 mock tests with 90% time efficiency",
      icon: Clock,
      progress: 33,
      unlocked: false,
      xp: 200,
      color: "text-cyan-600",
      bgColor: "bg-cyan-100"
    }
  ];
  
  const challenges = [
    {
      id: 1,
      title: "Weekly Physics Challenge",
      description: "Complete 3 physics mock tests with at least 80% score",
      reward: "150 XP + Physics Study Guide",
      progress: 66,
      deadline: "2 days left",
      icon: Star
    },
    {
      id: 2,
      title: "5-Day Study Streak",
      description: "Study for at least 2 hours each day for 5 consecutive days",
      reward: "100 XP + 1 Day Streak Protector",
      progress: 80,
      deadline: "1 day left",
      icon: Flame
    },
    {
      id: 3,
      title: "Chemistry Practice Marathon",
      description: "Solve 100 chemistry practice problems",
      reward: "200 XP + Chemistry Formula Sheet",
      progress: 45,
      deadline: "4 days left",
      icon: Trophy
    }
  ];
  
  const leaderboardData = [
    { rank: 1, name: "Alex Johnson", xp: 4250, avatar: "AJ", change: "up" },
    { rank: 2, name: "Maria Garcia", xp: 3980, avatar: "MG", change: "down" },
    { rank: 3, name: "You", xp: 3650, avatar: "JS", change: "up", isCurrentUser: true },
    { rank: 4, name: "Sanjay Patel", xp: 3590, avatar: "SP", change: "same" },
    { rank: 5, name: "Emma Wilson", xp: 3470, avatar: "EW", change: "up" }
  ];
  
  const rewards = [
    {
      title: "Premium Study Guide",
      description: "Comprehensive guide for JEE Advanced",
      cost: "500 XP",
      icon: Gift,
      color: "text-purple-600",
      bgColor: "bg-purple-100"
    },
    {
      title: "Mock Test Boost",
      description: "Extra time in your next mock test",
      cost: "300 XP",
      icon: Clock,
      color: "text-blue-600",
      bgColor: "bg-blue-100"
    },
    {
      title: "Streak Protector",
      description: "Maintain your streak even if you miss a day",
      cost: "250 XP",
      icon: Shield,
      color: "text-amber-600",
      bgColor: "bg-amber-100"
    }
  ];
  
  return (
    <DashboardLayout>
      <FadeIn direction="up">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-1">Achievements & Rewards</h1>
          <p className="text-muted-foreground">Track your progress, earn rewards, and compete with peers</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Level Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-baseline mb-1">
                <div className="text-2xl font-bold">Level 12</div>
                <div className="text-xs text-muted-foreground">980 / 1000 XP</div>
              </div>
              <Progress value={98} className="h-2 mb-2" />
              <div className="text-xs text-muted-foreground mt-2">
                Just 20 XP more to reach Level 13!
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Study Streak</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-baseline mb-1">
                <div className="text-2xl font-bold">14 Days</div>
                <div className="text-xs text-green-600 font-medium">Current</div>
              </div>
              <Progress value={70} className="h-2 mb-2" />
              <div className="text-xs text-muted-foreground mt-2">
                Your longest streak: 21 days
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Achievements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-baseline mb-1">
                <div className="text-2xl font-bold">8/20</div>
                <div className="text-xs text-muted-foreground">Unlocked</div>
              </div>
              <Progress value={40} className="h-2 mb-2" />
              <div className="text-xs text-muted-foreground mt-2 flex justify-between">
                <span>Next achievement: All-Rounder</span>
                <span className="text-primary">75%</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Your Achievements</CardTitle>
                <CardDescription>Unlock achievements by completing various milestones</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {achievements.map((achievement) => (
                    <div 
                      key={achievement.id} 
                      className={`border rounded-lg p-4 ${achievement.unlocked ? 'border-green-200 bg-green-50' : 'border-gray-200'}`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`${achievement.bgColor} rounded-full p-2 h-fit`}>
                          <achievement.icon className={`h-5 w-5 ${achievement.color}`} />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <h3 className="font-medium">{achievement.title}</h3>
                            <Badge variant={achievement.unlocked ? "default" : "outline"} className="ml-2">
                              {achievement.xp} XP
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1 mb-2">{achievement.description}</p>
                          <div className="space-y-1">
                            <div className="flex justify-between text-xs mb-1">
                              <span>{achievement.progress}% Complete</span>
                              {achievement.unlocked && achievement.date && (
                                <span className="text-green-600">Unlocked: {achievement.date}</span>
                              )}
                            </div>
                            <Progress value={achievement.progress} className="h-1" />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Active Challenges</CardTitle>
                <CardDescription>Complete challenges to earn XP and special rewards</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {challenges.map((challenge) => (
                    <div key={challenge.id} className="border rounded-lg p-4">
                      <div className="flex items-start space-x-3">
                        <div className="bg-primary/10 rounded-full p-2 h-fit">
                          <challenge.icon className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <h3 className="font-medium">{challenge.title}</h3>
                            <Badge variant="outline" className="text-amber-600 border-amber-200 bg-amber-50">
                              {challenge.deadline}
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1 mb-1">{challenge.description}</p>
                          <div className="flex justify-between text-xs mb-1">
                            <span>Reward: {challenge.reward}</span>
                            <span>{challenge.progress}% Complete</span>
                          </div>
                          <Progress value={challenge.progress} className="h-1 mb-2" />
                          <div className="flex justify-end">
                            <Button size="sm" variant="outline">View Details</Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Top Performers</CardTitle>
                <CardDescription>Weekly leaderboard based on XP earned</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {leaderboardData.map((user) => (
                    <div 
                      key={user.rank} 
                      className={`flex items-center p-2 rounded-lg ${user.isCurrentUser ? 'bg-primary/5 border border-primary/20' : ''}`}
                    >
                      <div className="flex items-center space-x-3 flex-1">
                        <div className="font-semibold w-6 text-center">{user.rank}</div>
                        <AnimatedAvatar 
                          fallback={user.avatar} 
                          size="sm"
                          animation={user.isCurrentUser ? "pulse" : "none"}
                        />
                        <div className="font-medium text-sm">
                          {user.name}
                          {user.isCurrentUser && <span className="text-xs ml-1 text-muted-foreground">(You)</span>}
                        </div>
                      </div>
                      <div className="flex items-center">
                        <span className="font-semibold mr-2">{user.xp} XP</span>
                        {user.change === 'up' && <TrendingUp className="h-4 w-4 text-green-600" />}
                        {user.change === 'down' && <TrendingUp className="h-4 w-4 text-red-600 transform rotate-180" />}
                      </div>
                    </div>
                  ))}
                </div>
                
                <Separator className="my-4" />
                
                <div className="flex justify-between items-center">
                  <Button variant="link" size="sm" className="px-0 text-primary">
                    View Full Leaderboard
                  </Button>
                  <Badge variant="outline" className="flex items-center">
                    <Users className="h-3 w-3 mr-1" />
                    325 Students
                  </Badge>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Redeem Rewards</CardTitle>
                <CardDescription>Use your XP to unlock special rewards</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {rewards.map((reward, index) => (
                    <div key={index} className="border rounded-lg p-3">
                      <div className="flex space-x-3">
                        <div className={`${reward.bgColor} rounded-full p-2 h-fit`}>
                          <reward.icon className={`h-4 w-4 ${reward.color}`} />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <h3 className="font-medium text-sm">{reward.title}</h3>
                            <Badge variant="outline">{reward.cost}</Badge>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1 mb-2">{reward.description}</p>
                          <Button size="sm" variant="outline" className="w-full">Redeem</Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 p-3 bg-secondary rounded-lg">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium">Your Balance</span>
                    <span className="font-semibold">980 XP</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Earn more XP by completing challenges, achievements, and maintaining your study streak.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </FadeIn>
    </DashboardLayout>
  );
};

// Import missing Shield icon
const Shield = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
  </svg>
);

export default Gamification;
