
import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { BookOpen, Award, Clock, Brain, FileText, TrendingUp, Bell } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import FadeIn from '@/components/animations/FadeIn';
import AnimatedAvatar from '@/components/ui/avatar-animated';

const Dashboard = () => {
  const upcomingTasks = [
    {
      title: 'Complete Physics Mock Test',
      subject: 'Physics',
      deadline: 'Today, 5:00 PM',
      icon: FileText,
      iconColor: 'text-blue-600',
      iconBgColor: 'bg-blue-100',
      progress: 0,
      type: 'test'
    },
    {
      title: 'Study Thermodynamics Chapter 3',
      subject: 'Physics',
      deadline: 'Tomorrow, 12:00 PM',
      icon: BookOpen,
      iconColor: 'text-purple-600',
      iconBgColor: 'bg-purple-100',
      progress: 25,
      type: 'study'
    },
    {
      title: 'Mathematics Revision Session',
      subject: 'Mathematics',
      deadline: 'Oct 15, 10:00 AM',
      icon: Brain,
      iconColor: 'text-green-600',
      iconBgColor: 'bg-green-100',
      progress: 60,
      type: 'revision'
    }
  ];

  const achievements = [
    {
      title: 'Fast Learner',
      description: 'Completed 5 study sessions in a day',
      icon: TrendingUp,
      iconColor: 'text-amber-600',
      iconBgColor: 'bg-amber-100',
      date: 'Yesterday'
    },
    {
      title: 'Physics Master',
      description: 'Scored 90% in 3 consecutive physics tests',
      icon: Award,
      iconColor: 'text-blue-600',
      iconBgColor: 'bg-blue-100',
      date: '2 days ago'
    }
  ];

  const notifications = [
    {
      title: 'New Mock Test Available',
      description: 'Chemistry: Organic Compounds',
      time: '2 hours ago',
      isRead: false
    },
    {
      title: 'Streak Reminder',
      description: 'Don\'t forget to study today to maintain your streak!',
      time: '5 hours ago',
      isRead: true
    }
  ];

  return (
    <DashboardLayout>
      <FadeIn direction="up">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-1">Welcome back, John!</h1>
          <p className="text-muted-foreground">Here's your learning summary for today</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Study Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-baseline mb-1">
                <div className="text-2xl font-bold">64%</div>
                <div className="text-xs text-muted-foreground">October 2023</div>
              </div>
              <Progress value={64} className="h-2 mb-2" />
              <div className="text-xs text-muted-foreground flex items-center mt-2">
                <TrendingUp className="h-3 w-3 mr-1 text-green-600" />
                <span className="text-green-600 font-medium">↑ 12%</span> from last week
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Daily Streak</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-baseline mb-1">
                <div className="text-2xl font-bold">14 Days</div>
                <Badge className="bg-green-600">Active</Badge>
              </div>
              <Progress value={70} className="h-2 mb-2" />
              <div className="text-xs text-muted-foreground mt-2">
                Keep it up! 1 more day to unlock a new badge.
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">XP Points</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-baseline mb-1">
                <div className="text-2xl font-bold">980 / 1000</div>
                <div className="text-xs text-muted-foreground">Level 12</div>
              </div>
              <Progress value={98} className="h-2 mb-2" />
              <div className="text-xs text-muted-foreground mt-2">
                Just 20 XP more to reach Level 13!
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Upcoming Tasks</CardTitle>
                  <Button variant="ghost" size="sm">View All</Button>
                </div>
                <CardDescription>Your scheduled study sessions and tests</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingTasks.map((task, index) => (
                    <div key={index} className="flex space-x-4">
                      <div className={`${task.iconBgColor} rounded-full p-2 h-fit`}>
                        <task.icon className={`h-4 w-4 ${task.iconColor}`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <div>
                            <h3 className="font-medium">{task.title}</h3>
                            <div className="flex items-center mt-1">
                              <Badge variant="secondary" className="mr-2">{task.subject}</Badge>
                              <div className="flex items-center text-xs text-muted-foreground">
                                <Clock className="h-3 w-3 mr-1" />
                                {task.deadline}
                              </div>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            {task.type === 'test' ? 'Take Test' : (task.type === 'revision' ? 'Start Revision' : 'Start')}
                          </Button>
                        </div>
                        {task.progress > 0 && (
                          <div className="mt-2">
                            <div className="flex justify-between text-xs mb-1">
                              <span>Progress</span>
                              <span>{task.progress}%</span>
                            </div>
                            <Progress value={task.progress} className="h-1" />
                          </div>
                        )}
                        {index < upcomingTasks.length - 1 && <Separator className="mt-4" />}
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
                <div className="flex justify-between items-center">
                  <CardTitle>Recent Achievements</CardTitle>
                  <Button variant="ghost" size="sm">View All</Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {achievements.map((achievement, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className={`${achievement.iconBgColor} rounded-full p-2 h-fit`}>
                        <achievement.icon className={`h-4 w-4 ${achievement.iconColor}`} />
                      </div>
                      <div>
                        <h3 className="font-medium">{achievement.title}</h3>
                        <p className="text-xs text-muted-foreground mb-1">{achievement.description}</p>
                        <span className="text-xs text-muted-foreground">{achievement.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Notifications</CardTitle>
                  <Button variant="ghost" size="sm">Clear All</Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {notifications.map((notification, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className={`rounded-full p-2 h-fit ${notification.isRead ? 'bg-secondary' : 'bg-primary/10'}`}>
                        <Bell className={`h-4 w-4 ${notification.isRead ? 'text-muted-foreground' : 'text-primary'}`} />
                      </div>
                      <div>
                        <h3 className={`font-medium ${notification.isRead ? '' : 'text-primary'}`}>{notification.title}</h3>
                        <p className="text-xs text-muted-foreground mb-1">{notification.description}</p>
                        <span className="text-xs text-muted-foreground">{notification.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </FadeIn>
    </DashboardLayout>
  );
};

export default Dashboard;
