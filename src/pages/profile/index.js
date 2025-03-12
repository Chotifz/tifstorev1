import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import axios from "axios";


// UI Components
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Bell, 
  Shield, 
  LogOut, 
  CheckCircle2,
  Camera, 
  ChevronRight,
  AlertCircle
} from "lucide-react";

function AccountPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [activeTab, setActiveTab] = useState("profile");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  
  // Form state for profile
  const [profileForm, setProfileForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  
  // Form state for password change
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  
  // Notification preferences
  const [notificationPrefs, setNotificationPrefs] = useState({
    promotions: true,
    orderUpdates: true,
    newGames: false,
    securityAlerts: true
  });
  
  // Set the active tab based on URL query parameter
  useEffect(() => {
    if (router.query.tab) {
      setActiveTab(router.query.tab);
    }
  }, [router.query.tab]);
  
  // Fetch user data
  useEffect(() => {
    if (status === "authenticated") {
      const fetchUserData = async () => {
        try {
          const response = await axios.get('/api/user/profile');
          setUser(response.data);
          setProfileForm({
            name: response.data.name || "",
            email: response.data.email || "",
            phone: response.data.phone || "",
            address: response.data.address || "",
          });
          setLoading(false);
        } catch (error) {
          console.error("Error fetching user data:", error);
          setError("Gagal memuat data pengguna. Silakan coba lagi.");
          setLoading(false);
        }
      };
      
      fetchUserData();
    }
  }, [status]);
  
  // Handle profile form changes
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileForm(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Handle password form changes
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Handle notification preferences changes
  const handleNotificationToggle = (key, checked) => {
    setNotificationPrefs(prev => ({
      ...prev,
      [key]: checked
    }));
  };
  
  // Save profile changes
  const handleSaveProfile = async (e) => {
    e.preventDefault();
    
    setError("");
    setSuccessMessage("");
    setSaving(true);
    
    try {
      const response = await axios.put('/api/user/profile', profileForm);
      setUser(response.data);
      setSuccessMessage("Profil berhasil diperbarui");
      setSaving(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      setError(error.response?.data?.message || "Gagal memperbarui profil. Silakan coba lagi.");
      setSaving(false);
    }
  };
  
  // Change password
  const handleChangePassword = async (e) => {
    e.preventDefault();
    
    // Validate passwords
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setError("Password baru dan konfirmasi password tidak cocok");
      return;
    }
    
    if (passwordForm.newPassword.length < 8) {
      setError("Password baru harus minimal 8 karakter");
      return;
    }
    
    setError("");
    setSuccessMessage("");
    setSaving(true);
    
    try {
      await axios.put('/api/user/password', {
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword
      });
      
      setSuccessMessage("Password berhasil diubah");
      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
      });
      setSaving(false);
    } catch (error) {
      console.error("Error changing password:", error);
      setError(error.response?.data?.message || "Gagal mengubah password. Silakan coba lagi.");
      setSaving(false);
    }
  };
  
  // Save notification preferences
  const handleSaveNotificationPrefs = async (e) => {
    e.preventDefault();
    
    setError("");
    setSuccessMessage("");
    setSaving(true);
    
    // Mock implementation - in a real app, you'd save to your API
    setTimeout(() => {
      setSuccessMessage("Preferensi notifikasi berhasil disimpan");
      setSaving(false);
    }, 1000);
  };
  
  // If not authenticated or still loading session, show loading state
  if (status !== "authenticated" || loading) {
    return null; // The withAuth HOC will handle loading state
  }
  
  // Generate user initials for the avatar fallback
  const userInitials = user?.name
    ? user.name
        .split(' ')
        .map(n => n[0])
        .join('')
    : 'U';
  
  return (
    <>
      <Head>
        <title>Akun Saya | TIF Store</title>
        <meta name="description" content="Kelola akun Anda di TIF Store" />
      </Head>
      
      <div className="max-w-6xl mx-auto py-8 px-4">
        <h1 className="text-2xl font-bold mb-6">Akun Saya</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="mb-6">
              <CardContent className="p-4 flex flex-col items-center text-center">
                <div className="relative my-4">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={user.image} />
                    <AvatarFallback className="bg-primary/10 text-primary text-xl font-medium">
                      {userInitials}
                    </AvatarFallback>
                  </Avatar>
                  <Button size="icon" variant="outline" className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full bg-background">
                    <Camera className="h-4 w-4" />
                  </Button>
                </div>
                
                <h2 className="text-lg font-semibold mt-2 flex items-center justify-center">
                  {user.name}
                  {user.isVerified && (
                    <CheckCircle2 className="h-4 w-4 text-primary ml-1" />
                  )}
                </h2>
                <p className="text-sm text-muted-foreground">{user.email}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Bergabung sejak {new Date(user.joinDate).toLocaleDateString('id-ID', { year: 'numeric', month: 'long' })}
                </p>
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden">
              <div className="flex flex-col">
                <Button 
                  variant={activeTab === "profile" ? "default" : "ghost"} 
                  className="justify-start rounded-none border-l-2 px-4 py-3 h-auto font-normal text-base hover:bg-muted/50"
                  onClick={() => {
                    setActiveTab("profile");
                    router.push("/profile?tab=profile", undefined, { shallow: true });
                  }}
                >
                  <User className="mr-2 h-4 w-4" />
                  Profil
                </Button>
                <Button 
                  variant="ghost" 
                  className="justify-start rounded-none border-l-2 border-transparent px-4 py-3 h-auto font-normal text-base hover:bg-muted/50"
                  onClick={() => router.push("/orderes")}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                    <rect width="20" height="14" x="2" y="5" rx="2" />
                    <line x1="2" x2="22" y1="10" y2="10" />
                  </svg>
                  Pesanan
                </Button>
                <Button 
                  variant={activeTab === "notifications" ? "default" : "ghost"} 
                  className="justify-start rounded-none border-l-2 px-4 py-3 h-auto font-normal text-base hover:bg-muted/50"
                  onClick={() => {
                    setActiveTab("notifications");
                    router.push("/profile?tab=notifications", undefined, { shallow: true });
                  }}
                >
                  <Bell className="mr-2 h-4 w-4" />
                  Notifikasi
                </Button>
                <Button 
                  variant={activeTab === "security" ? "default" : "ghost"} 
                  className="justify-start rounded-none border-l-2 px-4 py-3 h-auto font-normal text-base hover:bg-muted/50"
                  onClick={() => {
                    setActiveTab("security");
                    router.push("/profile?tab=security", undefined, { shallow: true });
                  }}
                >
                  <Shield className="mr-2 h-4 w-4" />
                  Keamanan
                </Button>
              </div>
            </Card>
          </div>
          
          {/* Main Content */}
          <div className="lg:col-span-3">
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            {successMessage && (
              <Alert variant="success" className="mb-4 bg-green-50 text-green-800 border-green-200">
                <CheckCircle2 className="h-4 w-4" />
                <AlertDescription>{successMessage}</AlertDescription>
              </Alert>
            )}
            
            <Tabs value={activeTab} className="w-full">
              {/* Profile Tab */}
              <TabsContent value="profile" className="space-y-4 mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Informasi Profil</CardTitle>
                    <CardDescription>
                      Kelola informasi pribadi Anda
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <form onSubmit={handleSaveProfile}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Nama Lengkap</Label>
                          <Input 
                            id="name" 
                            name="name"
                            value={profileForm.name} 
                            onChange={handleProfileChange}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">
                            Email
                            {user.isVerified && (
                              <Badge variant="outline" className="ml-2 text-xs bg-green-50 text-green-700 border-green-200">
                                Terverifikasi
                              </Badge>
                            )}
                          </Label>
                          <Input 
                            id="email" 
                            name="email"
                            value={profileForm.email} 
                            onChange={handleProfileChange}
                            disabled={user.isVerified} 
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Nomor Handphone</Label>
                          <Input 
                            id="phone" 
                            name="phone"
                            value={profileForm.phone} 
                            onChange={handleProfileChange}
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2 mt-4">
                        <Label htmlFor="address">Alamat</Label>
                        <Input 
                          id="address" 
                          name="address"
                          value={profileForm.address} 
                          onChange={handleProfileChange}
                        />
                      </div>
                      
                      <div className="mt-6">
                        <Button type="submit" disabled={saving}>
                          {saving ? "Menyimpan..." : "Simpan Perubahan"}
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Metode Pembayaran Tersimpan</CardTitle>
                    <CardDescription>
                      Kelola metode pembayaran Anda untuk mempercepat checkout
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center">
                          <div className="bg-[#2269E3] h-10 w-14 rounded flex items-center justify-center mr-4">
                            <span className="text-white font-bold text-sm">DANA</span>
                          </div>
                          <div>
                            <p className="font-medium">DANA</p>
                            <p className="text-sm text-muted-foreground">081****6789</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <Button variant="outline" className="w-full">
                        + Tambah Metode Pembayaran
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Notifications Tab */}
              <TabsContent value="notifications" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Pengaturan Notifikasi</CardTitle>
                    <CardDescription>
                      Kelola preferensi notifikasi Anda
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <form onSubmit={handleSaveNotificationPrefs}>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="text-base">Promosi & Diskon</Label>
                          <p className="text-sm text-muted-foreground">
                            Dapatkan informasi tentang promosi dan diskon terbaru
                          </p>
                        </div>
                        <Switch 
                          checked={notificationPrefs.promotions}
                          onCheckedChange={(checked) => handleNotificationToggle('promotions', checked)}
                        />
                      </div>
                      <Separator className="my-6" />
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="text-base">Update Pesanan</Label>
                          <p className="text-sm text-muted-foreground">
                            Pemberitahuan tentang status pesanan Anda
                          </p>
                        </div>
                        <Switch 
                          checked={notificationPrefs.orderUpdates}
                          onCheckedChange={(checked) => handleNotificationToggle('orderUpdates', checked)}
                        />
                      </div>
                      <Separator className="my-6" />
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="text-base">Game Baru</Label>
                          <p className="text-sm text-muted-foreground">
                            Pemberitahuan tentang game baru yang tersedia
                          </p>
                        </div>
                        <Switch 
                          checked={notificationPrefs.newGames}
                          onCheckedChange={(checked) => handleNotificationToggle('newGames', checked)}
                        />
                      </div>
                      <Separator className="my-6" />
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="text-base">Keamanan</Label>
                          <p className="text-sm text-muted-foreground">
                            Pemberitahuan tentang aktivitas akun Anda
                          </p>
                        </div>
                        <Switch 
                          checked={notificationPrefs.securityAlerts}
                          onCheckedChange={(checked) => handleNotificationToggle('securityAlerts', checked)}
                        />
                      </div>
                      
                      <div className="mt-6">
                        <Button type="submit" disabled={saving}>
                          {saving ? "Menyimpan..." : "Simpan Preferensi"}
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Security Tab */}
              <TabsContent value="security" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Keamanan Akun</CardTitle>
                    <CardDescription>
                      Kelola pengaturan keamanan akun Anda
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <form onSubmit={handleChangePassword}>
                      <div className="space-y-2">
                        <Label htmlFor="currentPassword">Password Saat Ini</Label>
                        <Input 
                          id="currentPassword" 
                          name="currentPassword"
                          type="password" 
                          value={passwordForm.currentPassword}
                          onChange={handlePasswordChange}
                        />
                      </div>
                      <div className="space-y-2 mt-4">
                        <Label htmlFor="newPassword">Password Baru</Label>
                        <Input 
                          id="newPassword" 
                          name="newPassword"
                          type="password" 
                          value={passwordForm.newPassword}
                          onChange={handlePasswordChange}
                        />
                      </div>
                      <div className="space-y-2 mt-4">
                        <Label htmlFor="confirmPassword">Konfirmasi Password Baru</Label>
                        <Input 
                          id="confirmPassword" 
                          name="confirmPassword"
                          type="password" 
                          value={passwordForm.confirmPassword}
                          onChange={handlePasswordChange}
                        />
                      </div>
                      
                      <Alert className="bg-muted border-none mt-4">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>
                          Password harus minimal 8 karakter dan mengandung huruf besar, huruf kecil, angka, dan simbol.
                        </AlertDescription>
                      </Alert>
                      
                      <div className="mt-6">
                        <Button type="submit" disabled={saving}>
                          {saving ? "Menyimpan..." : "Ubah Password"}
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
                
                <Card className="mt-4">
                  <CardHeader>
                    <CardTitle>Log Aktivitas</CardTitle>
                    <CardDescription>
                      Aktivitas login terbaru pada akun Anda
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Login Berhasil</p>
                          <p className="text-sm text-muted-foreground">Jakarta, Indonesia</p>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {new Date().toLocaleString('id-ID', { 
                            day: 'numeric', 
                            month: 'short', 
                            year: 'numeric', 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
}

export default AccountPage;