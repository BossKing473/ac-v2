"use client"

/* eslint-disable @next/next/no-img-element */

import { useState, useEffect } from "react"
import { ArrowRight, AlertCircle, CheckCircle, Shield, User, UserCircle, Calendar, MapPin, Accessibility, Lock, Fingerprint } from "lucide-react"
import { createClient } from "@/app/utils/client";
import { useRouter } from "next/navigation";
import Image from "next/image"
import logo from "@/public/Accessible Connections.png"

export default function AuthPage() {
  const supabase = createClient();
  const router = useRouter()
  const [showWelcome, setShowWelcome] = useState(true);
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [pwdIdPreview, setPwdIdPreview] = useState<string | null>(null);
  const [showPreviewModal, setShowPreviewModal] = useState(false);

  const [loginInput, setLoginInput] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    const timer = setTimeout(() => setShowWelcome(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  const [formData, setFormData] = useState<{
    full_name: string;
    email: string;
    password: string;
    disability_type: string;
    sex: string;
    birthdate: string;
    address: string;
    pwdIdFile: File | null;
      pwd_id: string;
    pwd_id_image_url: string | null;
  }>({
    full_name: "",
    email: "",
    password: "",
    disability_type: "",
    sex: "",
    birthdate: "",
    address: "",  pwd_id: "",
    pwdIdFile: null,
    pwd_id_image_url: null,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const target = e.target as HTMLInputElement;
    const { name, value } = target;

    if (name === "pwdIdFile" && target.files) {
      const file = target.files[0];
      setFormData(prev => ({ ...prev, pwdIdFile: file }));
      setPwdIdPreview(URL.createObjectURL(file));
      return;
    }

    if (isLogin) {
      setLoginInput(prev => ({ ...prev, [name]: value }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const toggleMode = () => {
    setIsLogin(prev => !prev);
    setErrorMessage(null);
    setSuccessMessage(null);
  };

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword(loginInput);
        if (error) throw error;
        setSuccessMessage("Login successful!");
        router.push(
          "/dashboard"
        )
        router.refresh();
        return;
      }
if (formData.pwd_id.length !== 15) {
  throw new Error("PWD ID must be exactly 15 digits");
}
      // SIGNUP
      if (!formData.pwdIdFile) throw new Error("PWD ID image is required");

      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });
      if (signUpError) throw signUpError;

      const userId = signUpData.user?.id;
      if (!userId) throw new Error("User ID not found after signup");

      // Upload PWD ID image
      const fileExt = formData.pwdIdFile.name.split(".").pop();
      const fileName = `pwd-id-${userId}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("pwd-id-images")
        .upload(fileName, formData.pwdIdFile, { upsert: true });

      if (uploadError) throw uploadError;

      const pwdIdImageUrl = supabase.storage
        .from("pwd-id-images")
        .getPublicUrl(fileName).data.publicUrl;

      // Insert profile row (Supabase trigger can generate pwd_id)
      const { error: insertError } = await supabase
        .from("profile")
        .insert([{
          user_id: userId,
          full_name: formData.full_name,
          email: formData.email,
          disability_type: formData.disability_type,
          sex: formData.sex,
          birthdate: formData.birthdate,
          address: formData.address,
           pwd_id: formData.pwd_id,
          pwd_id_image_url: pwdIdImageUrl
        }]);

      if (insertError) throw insertError;

      setSuccessMessage("Account created successfully!");
      setFormData({
        full_name: "",
        email: "",
        password: "",
        disability_type: "",
        sex: "",
        birthdate: "",
        address: "",
        pwd_id: "",
        pwdIdFile: null,
        pwd_id_image_url: null,
      }); 
      setPwdIdPreview(null);
      setIsLogin(true);
      router.refresh();
    } catch (err: unknown) {
      setErrorMessage(err.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };


  if (showWelcome) {
    return (
      <div className="fixed inset-0 z-50 bg-[#0f172a] flex flex-col items-center justify-center text-white p-6 text-center overflow-hidden font-sans">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-secondary/20 rounded-full blur-[100px] animate-pulse delay-75"></div>
        <div className="relative z-10 flex flex-col items-center max-w-4xl mx-auto">
          <div className="w-24 h-24 mb-10 relative">
            <div className="absolute inset-0 border-t-4 border-primary rounded-full animate-spin"></div>
            <div className="absolute inset-2 border-r-4 border-secondary rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
            <div className="absolute inset-4 border-b-4 border-accent rounded-full animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center font-bold text-2xl text-white">
              <Image src={logo} alt="Logo" width={100} height={100} />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-8 animate-[fadeIn_1s_ease-out]">Welcome</h1>
          <div className="space-y-6 animate-[fadeInUp_1s_ease-out_0.5s_both]">
            <p className="text-2xl md:text-4xl font-light leading-tight text-blue-100">{`"Accessibility for All:`}</p>
            <p className="text-xl md:text-3xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary-light to-accent leading-tight">
              Developing a Website for Free Service for Persons with Disabilities in the {`Philippines"`}</p>
          </div>
          <div className="mt-12 w-64 h-1.5 bg-gray-800 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-primary to-secondary w-full animate-[loadingBar_3.5s_ease-in-out_forwards] origin-left scale-x-0"></div>
          </div>
          <p className="mt-4 text-sm text-gray-500 animate-pulse">Preparing your digital platform...</p>
        </div>
        <style>{`
          @keyframes loadingBar { 0% { transform: scaleX(0); } 100% { transform: scaleX(1); } }
          @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        `}</style>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex bg-gray-50 font-san ">
      {/* LEFT BRANDING */}
      <div className="hidden bg-blue-950 lg:flex w-1/2 relative flex-col justify-between p-16 text-white overflow-hidden ">
        <div className="absolute top-0 left-0 w-full h-full z-0">
          <div className="absolute top-[-20%] left-[-20%] w-[800px] h-[800px] bg-primary/20 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-secondary/20 rounded-full blur-[100px]"></div>
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-8 pt-10">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-primary to-primary-light flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-primary/30">
            <Image src={logo} alt="Logo" width={40} height={40} />
            </div>
            <span className="text-2xl font-bold tracking-tight">Accessible Connections</span>
          </div>
          <h1 className="text-6xl font-extrabold leading-tight mb-6">
            One ID. <br />
            <span className="text-purple-00 bg-clip-text bg-gradient-to-r from-primary-light to-accent">Limitless Access.</span>
          </h1>
          <p className="text-xl text-blue-100/70 max-w-lg leading-relaxed">
            The <strong>AccessPWD Unique Identifier</strong> creates a secure, verifiable digital identity for Persons with Disabilities, unlocking government services and community support.
          </p>
        </div>
        <div className="relative z-10 flex justify-center py-10">
          <div className="w-[420px] h-[260px] rounded-3xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 backdrop-blur-xl shadow-2xl p-8 flex flex-col justify-between transform rotate-[-5deg] hover:rotate-0 transition-transform duration-500 group">
            <div className="flex justify-between items-start">
              <Fingerprint size={48} className="text-white/80 group-hover:text-primary-light transition-colors" />
              <div className="text-right">
                <p className="text-xs text-blue-200 uppercase tracking-widest font-bold">AccessPWD ID</p>
                <p className="text-white font-mono text-lg tracking-widest mt-1">RR - PPMM - BBB - NNNNNNN</p>
              </div>
            </div>
            <div>
              <p className="text-white/60 text-sm mb-1">Identity Verified</p>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                <span className="text-white font-bold text-xl">Juan Dela Cruz</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT FORM */}
      <div className="w-full lg:w-1/2 bg-white flex items-center justify-center p-6 md:p-12 relative overflow-y-auto max-h-screen">
        <div className="max-w-md w-full py-8">
          <div className="text-center mb-8 lg:hidden">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-primary to-primary-light flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">AC</div>
            <h2 className="text-2xl font-bold text-gray-900">Accessible Connections</h2>
          </div>

          <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">{isLogin ? 'Welcome Back' : 'Create AccessPWD'}</h2>
                <p className="text-gray-500 mt-1 text-sm">{isLogin ? 'Access your dashboard with your ID.' : 'Register your details to get started.'}</p>
              </div>
              <div className="hidden md:block text-primary/20"><Shield size={28} /></div>
            </div>

            {errorMessage && (
              <div className="mb-6 p-4 rounded-xl bg-red-50 text-red-600 border border-red-100 flex items-start gap-3 animate-[fadeIn_0.3s_ease-out]">
                <AlertCircle size={20} className="shrink-0 mt-0.5" />
                <p className="text-sm font-semibold">{errorMessage}</p>
              </div>
            )}

            {successMessage && (
              <div className="mb-6 p-4 rounded-xl bg-green-50 text-green-600 border border-green-100 flex items-start gap-3 animate-[fadeIn_0.3s_ease-out]">
                <CheckCircle size={20} className="shrink-0 mt-0.5" />
                <p className="text-sm font-semibold">{successMessage}</p>
              </div>
            )}

            <form onSubmit={handleAuthSubmit} className="space-y-4">
              {/* LOGIN FORM */}
              {isLogin && (
                <>
                  {/* Email */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-700 uppercase tracking-wide ml-1">Email <span className="text-red-500">*</span></label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      <input
                        type="email"
                        name="email"
                        value={loginInput.email}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-primary focus:bg-white outline-none transition-all font-medium text-sm"
                        placeholder="juan@example.com"
                        required
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-700 uppercase tracking-wide ml-1">Password <span className="text-red-500">*</span></label>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      <input
                        type="password"
                        name="password"
                        value={loginInput.password}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-primary focus:bg-white outline-none transition-all font-medium text-sm"
                        placeholder="********"
                        required
                      />
                    </div>
                  </div>
                </>
              )}

              {/* SIGNUP FORM */}
              {!isLogin && (
                <>
                  {/* Full Name */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-700 uppercase tracking-wide ml-1">Full Name <span className="text-red-500">*</span></label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      <input
                        type="text"
                        name="full_name"
                        value={formData.full_name}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-primary focus:bg-white outline-none transition-all font-medium text-sm"
                        placeholder="Juan Dela Cruz"
                        required
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-700 uppercase tracking-wide ml-1">Email <span className="text-red-500">*</span></label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-primary focus:bg-white outline-none transition-all font-medium text-sm"
                        placeholder="juan@example.com"
                        required
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-700 uppercase tracking-wide ml-1">Password <span className="text-red-500">*</span></label>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-primary focus:bg-white outline-none transition-all font-medium text-sm"
                        placeholder="********"
                        required
                      />
                    </div>
                  </div>

                  {/* Disability, Birthdate */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-700 uppercase tracking-wide ml-1">Disability <span className="text-red-500">*</span></label>
                      <div className="relative">
                        <Accessibility className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                        <select name="disability_type" value={formData.disability_type} onChange={handleInputChange} className="w-full pl-9 pr-2 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-primary focus:bg-white outline-none transition-all font-medium text-xs appearance-none cursor-pointer" required>
                          <option value="">Select...</option>
                          <option value="physical">Physical Disability</option>
                          <option value="visual">Visual Impairment</option>
                          <option value="hearing">Hearing Impairment</option>
                          <option value="intellectual">Intellectual Disability</option>
                          <option value="learning">Learning Disability</option>
                          <option value="psychosocial">Psychosocial Disability</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-700 uppercase tracking-wide ml-1">Birthdate <span className="text-red-500">*</span></label>
                      <div className="relative">
                        <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                        <input type="date" name="birthdate" value={formData.birthdate} onChange={handleInputChange} className="w-full pl-9 pr-2 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-primary focus:bg-white outline-none transition-all font-medium text-xs" required />
                      </div>
                    </div>
                  </div>

                  {/* Sex, Address */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-700 uppercase tracking-wide ml-1">Sex <span className="text-red-500">*</span></label>
                      <div className="relative">
                        <UserCircle className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                        <select name="sex" value={formData.sex} onChange={handleInputChange} className="w-full pl-9 pr-2 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-primary focus:bg-white outline-none transition-all font-medium text-xs appearance-none cursor-pointer" required>
                          <option value="">Select...</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-700 uppercase tracking-wide ml-1">Address <span className="text-red-500">*</span></label>
                      <div className="relative">
                        <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                        <input type="text" name="address" value={formData.address} onChange={handleInputChange} className="w-full pl-9 pr-2 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-primary focus:bg-white outline-none transition-all font-medium text-xs" placeholder="123 Street, City" required />
                      </div>
                    </div>
                  </div>
{/* PWD ID NUMBER */}
<div className="space-y-1.5">
  <label className="text-xs font-bold text-gray-700 uppercase tracking-wide ml-1">
    PWD ID Number <span className="text-red-500">*</span>
  </label>
  <div className="relative">
    <Fingerprint
      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
      size={18}
    />
    <input
      type="text"
      name="pwd_id"
      value={formData.pwd_id}
      onChange={(e) => {
        const value = e.target.value.replace(/\D/g, "");
        if (value.length <= 15) {
          setFormData(prev => ({ ...prev, pwd_id: value }));
        }
      }}
      maxLength={15}
      className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-primary focus:bg-white outline-none transition-all font-medium text-sm"
      placeholder="15-digit PWD ID"
      required
    />
  </div>
  <p className="text-xs text-gray-400 ml-1">
    Must be exactly 15 digits
  </p>
</div>

                  {/* PWD ID Upload */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-700 uppercase tracking-wide ml-1">PWD ID Image <span className="text-red-500">*</span></label>
                    <div className="flex lg:flex-row flex-col gap-3">
                      <input type="file" name="pwdIdFile" accept="image/*" onChange={handleInputChange} className="block flex-1 text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary-light" required />
                      {pwdIdPreview && (
                        <button
                          type="button"
                          onClick={() => setShowPreviewModal(true)}
                          className="px-4 py-2.5 bg-black text-white rounded-xl font-semibold text-sm hover:bg-opacity-90 transition-all shadow-md whitespace-nowrap"
                        >
                          👁️ Preview
                        </button>
                      )}
                    </div>
                  </div>
                </>
              )}
              {/* Submit */}
              <button type="submit" disabled={isLoading} className="w-full py-3 px-6 bg-primary text-white rounded-xl font-semibold hover:bg-primary-light transition-colors flex justify-center items-center gap-2">
                {isLoading ? "Processing..." : isLogin ? "Login" : "Create Account"}
                <ArrowRight size={18} />
              </button>
            </form>

            {/* Toggle Login/Signup */}
            <p className="mt-4 text-center text-gray-500 text-sm">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
              <button onClick={toggleMode} className="text-primary font-semibold hover:underline">{isLogin ? "Sign Up" : "Login"}</button>
            </p>
          </div>
        </div>
      </div>

      {/* PWD ID Preview Modal */}
      {showPreviewModal && pwdIdPreview && (
        <div 
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setShowPreviewModal(false)}
        >
          <div 
            className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center">
              <h3 className="text-2xl font-bold text-gray-900">PWD ID Preview</h3>
              <button
                onClick={() => setShowPreviewModal(false)}
                className="w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-full text-gray-600 transition-colors text-xl font-bold"
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-8 flex justify-center">
              <img
                src={pwdIdPreview}
                alt="PWD ID Preview"
                className="max-w-full h-auto max-h-[60vh] rounded-xl border-2 border-gray-200 shadow-lg"
              />
            </div>

            {/* Modal Footer */}
            <div className="border-t border-gray-200 p-6 flex justify-end gap-3 bg-gray-50">
              <button
                onClick={() => setShowPreviewModal(false)}
                className="px-6 py-3 bg-gray-200 text-gray-900 rounded-xl font-semibold hover:bg-gray-300 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
