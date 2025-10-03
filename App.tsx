import React, { useState } from 'react';
import { User, Briefcase, Shield, Star, Search, Filter, Users, Clock, MapPin } from 'lucide-react';
import { Button } from './components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { Input } from './components/ui/input';
import { Badge } from './components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './components/ui/avatar';
import { ImageWithFallback } from './components/figma/ImageWithFallback';
import LoginForm from './components/LoginForm';
import ClientDashboard from './components/ClientDashboard';
import TalentDashboard from './components/TalentDashboard';
import AdminDashboard from './components/AdminDashboard';

type UserRole = 'client' | 'talent' | 'admin' | null;

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

const mockJobs = [
  {
    id: '1',
    title: 'Commercial Model untuk Produk Skincare',
    client: 'Beauty Brand Indonesia',
    category: 'Commercial',
    ageRange: '20-30',
    gender: 'Female',
    location: 'Jakarta',
    deadline: '2024-01-15',
    applications: 25,
    description: 'Mencari model wanita untuk kampanye produk skincare premium. Harus memiliki kulit bersih dan berpengalaman di bidang beauty.',
    requirements: ['Tinggi minimal 165cm', 'Berpengalaman modeling', 'Kulit bersih', 'Fotogenic']
  },
  {
    id: '2',
    title: 'Talent untuk Iklan Makanan',
    client: 'Food Corp',
    category: 'TVC',
    ageRange: '25-40',
    gender: 'Any',
    location: 'Bandung',
    deadline: '2024-01-20',
    applications: 18,
    description: 'Dicari talent untuk iklan televisi produk makanan keluarga. Harus bisa berakting natural dan menyenangkan.',
    requirements: ['Pengalaman acting', 'Ekspresif', 'Comfortable dengan makanan', 'Available untuk shooting 3 hari']
  },
  {
    id: '3',
    title: 'Model Fashion Show',
    client: 'Jakarta Fashion Week',
    category: 'Fashion',
    ageRange: '18-28',
    gender: 'Any',
    location: 'Jakarta',
    deadline: '2024-01-10',
    applications: 42,
    description: 'Mencari model profesional untuk fashion show koleksi terbaru designer lokal dan internasional.',
    requirements: ['Tinggi minimal 170cm (pria), 165cm (wanita)', 'Pengalaman runway', 'Portfolio lengkap', 'Available untuk fitting dan show']
  }
];

export default function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState<'home' | 'login' | 'dashboard'>('home');

  const handleLogin = (userData: User) => {
    setCurrentUser(userData);
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentView('home');
  };

  const renderDashboard = () => {
    if (!currentUser) return null;

    switch (currentUser.role) {
      case 'client':
        return <ClientDashboard user={currentUser} onLogout={handleLogout} />;
      case 'talent':
        return <TalentDashboard user={currentUser} onLogout={handleLogout} />;
      case 'admin':
        return <AdminDashboard user={currentUser} onLogout={handleLogout} />;
      default:
        return null;
    }
  };

  if (currentView === 'login') {
    return <LoginForm onLogin={handleLogin} onBack={() => setCurrentView('home')} />;
  }

  if (currentView === 'dashboard') {
    return renderDashboard();
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Star className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold text-primary">Morelux Agency</h1>
            </div>
            <Button onClick={() => setCurrentView('login')}>
              Masuk / Daftar
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/5 to-primary/10 py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                Platform Casting Online <span className="text-primary">Terdepan</span>
              </h2>
              <p className="text-xl mb-8 text-muted-foreground">
                Mempertemukan client dengan talent terbaik secara digital. 
                Proses casting yang cepat, mudah, dan transparan.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" onClick={() => setCurrentView('login')}>
                  Mulai Sekarang
                </Button>
                <Button size="lg" variant="outline">
                  Pelajari Lebih Lanjut
                </Button>
              </div>
            </div>
            <div className="relative">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1733222814757-c80516c183d3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBjYXN0aW5nJTIwYWdlbmN5JTIwbW9kZWxzfGVufDF8fHx8MTc1OTQyMTU1NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Professional Models"
                className="rounded-lg shadow-2xl w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold mb-4">Fitur Unggulan Platform</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Solusi lengkap untuk kebutuhan casting digital dengan teknologi terdepan
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <Briefcase className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Client Dashboard</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Posting kebutuhan casting dengan detail lengkap dan pantau aplikasi talent secara real-time
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <User className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Talent Registration</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Buat profil lengkap dengan portofolio dan apply ke project casting yang sesuai
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Admin Control</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Dashboard admin untuk mengelola dan melakukan shortlist kandidat terbaik
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Latest Jobs Preview */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold mb-4">Casting Terbaru</h3>
            <p className="text-muted-foreground">
              Peluang casting terbaru untuk talent profesional
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockJobs.slice(0, 3).map((job) => (
              <Card key={job.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <Badge variant="secondary">{job.category}</Badge>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Users className="h-4 w-4 mr-1" />
                      {job.applications}
                    </div>
                  </div>
                  <CardTitle className="text-lg">{job.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">{job.client}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-2 text-muted-foreground" />
                      {job.gender} • {job.ageRange} tahun
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                      {job.location}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                      Deadline: {new Date(job.deadline).toLocaleDateString('id-ID')}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-3 line-clamp-2">
                    {job.description}
                  </p>
                  <Button className="w-full mt-4" onClick={() => setCurrentView('login')}>
                    Lihat Detail
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button variant="outline" onClick={() => setCurrentView('login')}>
              Lihat Semua Casting
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold mb-4">
            Siap Memulai Perjalanan Casting Digital?
          </h3>
          <p className="text-xl mb-8 opacity-90">
            Bergabung dengan ribuan client dan talent yang telah mempercayai Morelux Agency
          </p>
          <Button size="lg" variant="secondary" onClick={() => setCurrentView('login')}>
            Daftar Sekarang
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Star className="h-6 w-6" />
                <span className="text-lg font-bold">Morelux Agency</span>
              </div>
              <p className="text-gray-400">
                Platform casting online terdepan untuk industri kreatif Indonesia
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Untuk Client</li>
                <li>Untuk Talent</li>
                <li>Admin Panel</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Help Center</li>
                <li>Contact Us</li>
                <li>FAQ</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li>About Us</li>
                <li>Careers</li>
                <li>Privacy Policy</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Morelux Agency. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}