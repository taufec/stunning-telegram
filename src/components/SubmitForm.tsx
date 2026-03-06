import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import imageCompression from 'browser-image-compression';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import { ListingCard } from './ListingCard';
import { CheckCircle2, ChevronRight, ChevronLeft, Upload } from 'lucide-react';

const CATEGORIES = ['Education', 'Fintech', 'SaaS', 'Content', 'Marketing', 'Infra', 'Healthcare', 'Media', 'Agritech', 'AI / ML', 'E-commerce', 'Others'];
const DISTRICT_OPTIONS = ['Kota Setar', 'Kubang Pasu', 'Kulim', 'Langkawi', 'Baling', 'Sik', 'Padang Terap', 'Pendang', 'Yan', 'Bandar Baharu', 'Pokok Sena', 'Kuala Muda'];

export const SubmitForm: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    tagline: '',
    category: CATEGORIES[0],
    district: DISTRICT_OPTIONS[0],
    description: '',
    website_url: '',
    instagram_url: '',
    tiktok_url: '',
    linkedin_url: '',
  });

  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [projectFile, setProjectFile] = useState<File | null>(null);
  const [projectPreview, setProjectPreview] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>, type: 'logo' | 'project') => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      setLoading(true);
      setError(null);

      try {
        const options = {
          maxSizeMB: 0.5, // Compress to under 500KB
          maxWidthOrHeight: 1024,
          useWebWorker: true,
        };

        const compressedFile = await imageCompression(file, options);
        
        // Convert Blob to File
        const finalFile = new File([compressedFile], file.name, {
          type: file.type,
          lastModified: Date.now(),
        });

        if (type === 'logo') {
          setLogoFile(finalFile);
          setLogoPreview(URL.createObjectURL(finalFile));
        } else {
          setProjectFile(finalFile);
          setProjectPreview(URL.createObjectURL(finalFile));
        }
      } catch (err: any) {
        console.error('Compression error:', err);
        setError('Failed to process image. Please try another one.');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSubmit = async () => {
    if (!user) return;
    setLoading(true);
    setError(null);

    try {
      let logo_url = null;
      let project_image_url = null;

      if (logoFile) {
        const fileExt = logoFile.name.split('.').pop();
        const fileName = `logo-${Math.random()}.${fileExt}`;
        const filePath = `${user.id}/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('listing-logos')
          .upload(filePath, logoFile);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('listing-logos')
          .getPublicUrl(filePath);

        logo_url = publicUrl;
      }

      if (projectFile) {
        const fileExt = projectFile.name.split('.').pop();
        const fileName = `project-${Math.random()}.${fileExt}`;
        const filePath = `${user.id}/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('listing-logos')
          .upload(filePath, projectFile);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('listing-logos')
          .getPublicUrl(filePath);

        project_image_url = publicUrl;
      }

      const { error: insertError } = await supabase.from('listings').insert([
        {
          ...formData,
          logo_url,
          project_image_url,
          submitted_by: user.id,
          status: 'pending',
        },
      ]);

      if (insertError) throw insertError;

      setSuccess(true);
    } catch (err: any) {
      setError(err.message || 'An error occurred during submission.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-ivory px-6 py-24">
        <div className="max-w-md w-full text-center bg-white border border-obsidian/10 rounded-[3rem] p-12 shadow-sm">
          <div className="w-20 h-20 bg-champagne/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={40} className="text-champagne" />
          </div>
          <h2 className="text-3xl font-bold text-obsidian mb-4">Listing Submitted</h2>
          <p className="text-obsidian/60 mb-8">
            Your listing is under review. We'll notify you once it's live on the directory.
          </p>
          <button
            onClick={() => navigate('/')}
            className="px-8 py-4 bg-champagne text-obsidian rounded-full font-bold btn-magnetic w-full"
          >
            Return to Directory
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ivory pt-40 pb-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-obsidian mb-4">
            Put your work on the map.
          </h1>
          <p className="text-obsidian/60 text-lg">
            Submit your tech company, project, or community to the Kedah directory.
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="flex items-center gap-4 mb-12">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-4">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-mono text-sm font-bold transition-colors ${
                  step >= i ? 'bg-champagne text-obsidian' : 'bg-white text-obsidian/30 border border-obsidian/10'
                }`}
              >
                0{i}
              </div>
              {i < 3 && (
                <div className={`w-12 h-px ${step > i ? 'bg-champagne' : 'bg-obsidian/10'}`} />
              )}
            </div>
          ))}
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm p-4 rounded-2xl mb-8">
            {error}
          </div>
        )}

        <div className="bg-white border border-obsidian/10 rounded-[3rem] p-8 md:p-12 shadow-sm">
          {step === 1 && (
            <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-2xl font-bold text-obsidian mb-4">Basic Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-obsidian/80">Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    maxLength={50}
                    className="bg-ivory/50 border border-obsidian/10 rounded-2xl px-4 py-3 text-obsidian focus:outline-none focus:border-champagne/50"
                  />
                </div>
                
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-obsidian/80">Tagline *</label>
                  <input
                    type="text"
                    name="tagline"
                    value={formData.tagline}
                    onChange={handleInputChange}
                    required
                    maxLength={80}
                    placeholder="One short sentence"
                    className="bg-ivory/50 border border-obsidian/10 rounded-2xl px-4 py-3 text-obsidian focus:outline-none focus:border-champagne/50"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-obsidian/80">Category *</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="bg-ivory/50 border border-obsidian/10 rounded-2xl px-4 py-3 text-obsidian focus:outline-none focus:border-champagne/50 appearance-none"
                  >
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-obsidian/80">District *</label>
                  <select
                    name="district"
                    value={formData.district}
                    onChange={handleInputChange}
                    className="bg-ivory/50 border border-obsidian/10 rounded-2xl px-4 py-3 text-obsidian focus:outline-none focus:border-champagne/50 appearance-none"
                  >
                    {DISTRICT_OPTIONS.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-obsidian/80">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  maxLength={300}
                  rows={4}
                  className="bg-ivory/50 border border-obsidian/10 rounded-2xl px-4 py-3 text-obsidian focus:outline-none focus:border-champagne/50 resize-none"
                />
                <span className="text-xs text-obsidian/40 self-end">{formData.description.length}/300</span>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-2xl font-bold text-obsidian mb-4">Links & Logo</h2>
              
              <div className="flex flex-col gap-2 mb-8">
                <label className="text-sm font-medium text-obsidian/80">Logo Upload</label>
                <div className="flex items-center gap-6">
                  <div className="w-24 h-24 rounded-full bg-ivory/50 border border-obsidian/10 flex items-center justify-center overflow-hidden shrink-0">
                    {logoPreview ? (
                      <img src={logoPreview} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <Upload size={24} className="text-obsidian/30" />
                    )}
                  </div>
                  <div className="flex-grow">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileChange(e, 'logo')}
                      className="hidden"
                      id="logo-upload"
                    />
                    <label
                      htmlFor="logo-upload"
                      className="px-6 py-3 bg-obsidian/5 hover:bg-obsidian/10 text-obsidian rounded-full text-sm font-medium cursor-pointer transition-colors inline-block"
                    >
                      Choose Logo
                    </label>
                    <p className="text-xs text-obsidian/40 mt-2">Max 2MB. Square ratio recommended.</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2 mb-8">
                <label className="text-sm font-medium text-obsidian/80">Project Screenshot / Cover</label>
                <div className="flex flex-col gap-4">
                  <div className="w-full aspect-video rounded-2xl bg-ivory/50 border border-obsidian/10 flex items-center justify-center overflow-hidden">
                    {projectPreview ? (
                      <img src={projectPreview} alt="Project Preview" className="w-full h-full object-cover" />
                    ) : (
                      <div className="flex flex-col items-center gap-2 text-obsidian/30">
                        <Upload size={32} />
                        <span className="text-xs">Upload a screenshot of your project</span>
                      </div>
                    )}
                  </div>
                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileChange(e, 'project')}
                      className="hidden"
                      id="project-upload"
                    />
                    <label
                      htmlFor="project-upload"
                      className="px-6 py-3 bg-obsidian/5 hover:bg-obsidian/10 text-obsidian rounded-full text-sm font-medium cursor-pointer transition-colors inline-block"
                    >
                      Choose Project Image
                    </label>
                    <p className="text-xs text-obsidian/40 mt-2">Max 2MB. 16:9 ratio recommended.</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-obsidian/80">Website URL</label>
                  <input
                    type="url"
                    name="website_url"
                    value={formData.website_url}
                    onChange={handleInputChange}
                    placeholder="https://"
                    className="bg-ivory/50 border border-obsidian/10 rounded-2xl px-4 py-3 text-obsidian focus:outline-none focus:border-champagne/50"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-obsidian/80">Instagram URL</label>
                  <input
                    type="url"
                    name="instagram_url"
                    value={formData.instagram_url}
                    onChange={handleInputChange}
                    placeholder="https://instagram.com/"
                    className="bg-ivory/50 border border-obsidian/10 rounded-2xl px-4 py-3 text-obsidian focus:outline-none focus:border-champagne/50"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-obsidian/80">TikTok URL</label>
                  <input
                    type="url"
                    name="tiktok_url"
                    value={formData.tiktok_url}
                    onChange={handleInputChange}
                    placeholder="https://tiktok.com/"
                    className="bg-ivory/50 border border-obsidian/10 rounded-2xl px-4 py-3 text-obsidian focus:outline-none focus:border-champagne/50"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-obsidian/80">LinkedIn URL</label>
                  <input
                    type="url"
                    name="linkedin_url"
                    value={formData.linkedin_url}
                    onChange={handleInputChange}
                    placeholder="https://linkedin.com/company/"
                    className="bg-ivory/50 border border-obsidian/10 rounded-2xl px-4 py-3 text-obsidian focus:outline-none focus:border-champagne/50"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-2xl font-bold text-obsidian">Review Listing</h2>
              
              <div className="bg-ivory/50 p-8 rounded-[2rem] border border-obsidian/10">
                <p className="text-sm text-obsidian/40 mb-6 uppercase tracking-widest font-mono">Preview</p>
                <div className="max-w-sm mx-auto">
                  <ListingCard
                    listing={{
                      ...formData,
                      logo_url: logoPreview,
                      project_image_url: projectPreview,
                      is_featured: false,
                      is_sponsored: false,
                    }}
                  />
                </div>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between mt-12 pt-8 border-t border-obsidian/10">
            <button
              onClick={() => setStep(s => Math.max(1, s - 1))}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-colors ${
                step === 1 ? 'opacity-0 pointer-events-none' : 'text-obsidian/60 hover:text-obsidian hover:bg-obsidian/5'
              }`}
            >
              <ChevronLeft size={18} /> Back
            </button>

            {step < 3 ? (
              <button
                onClick={() => {
                  if (step === 1 && (!formData.name || !formData.tagline)) {
                    setError('Please fill in all required fields.');
                    return;
                  }
                  setError(null);
                  setStep(s => Math.min(3, s + 1));
                }}
                className="flex items-center gap-2 px-8 py-3 bg-obsidian text-ivory rounded-full font-bold hover:bg-obsidian/90 transition-colors"
              >
                Next <ChevronRight size={18} />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="flex items-center gap-2 px-8 py-3 bg-champagne text-obsidian rounded-full font-bold btn-magnetic disabled:opacity-50"
              >
                {loading ? 'Submitting...' : 'Submit Listing'} <CheckCircle2 size={18} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
