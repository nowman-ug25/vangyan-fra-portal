import React, { useState } from 'react';
import { FileText, CheckSquare, Printer, ArrowRight, ArrowLeft, RotateCcw, ShieldCheck } from 'lucide-react';

const formTypes = [
  {
    id: 'Form-A',
    title: 'Form-A: Individual Forest Rights (IFR)',
    desc: 'For habitation and self-cultivation up to 4 hectares.'
  },
  {
    id: 'Form-B',
    title: 'Form-B: Community Forest Rights (CFR)',
    desc: 'For nistar, minor forest produce, grazing, water bodies, and PVTG habitat rights.'
  },
  {
    id: 'Form-C',
    title: 'Form-C: Community Forest Resource (CFR) Rights',
    desc: 'For Gram Sabha management, conservation, and protection of customary forest boundaries.'
  }
];

const evidenceOptions = [
  { id: 'ev1', label: 'Voter ID / Ration Card / Domicile proof' },
  { id: 'ev2', label: 'Statement of village elders' },
  { id: 'ev3', label: 'Physical landmarks / traditional burial or sacred sites' },
  { id: 'ev4', label: 'Prior government records or pattas' }
];

const ClaimWizard = () => {
  const [step, setStep] = useState(1);
  const [formType, setFormType] = useState('Form-A');
  const [formData, setFormData] = useState({
    claimantName: '',
    spouseOrCommunity: '',
    village: '',
    gramPanchayat: '',
    block: '',
    district: '',
    state: '',
    claimDetails: ''
  });
  const [checkedDocs, setCheckedDocs] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDocToggle = (id) => {
    setCheckedDocs(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const resetWizard = () => {
    setStep(1);
    setFormType('Form-A');
    setFormData({
      claimantName: '',
      spouseOrCommunity: '',
      village: '',
      gramPanchayat: '',
      block: '',
      district: '',
      state: '',
      claimDetails: ''
    });
    setCheckedDocs({});
  };

  const primaryColor = '#1b4332';
  const creamColor = '#f8f5ee';
  const brownColor = '#6b4423';

  const buttonStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    backgroundColor: primaryColor,
    color: '#ffffff',
    padding: '0.75rem 1.5rem',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '1rem',
    marginTop: '1rem'
  };

  const secondaryButtonStyle = {
    ...buttonStyle,
    backgroundColor: 'transparent',
    color: primaryColor,
    border: `2px solid ${primaryColor}`
  };

  return (
    <div style={{ backgroundColor: creamColor, minHeight: '100%', padding: '2rem' }}>
      
      {/* Wizard Header */}
      <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
        <h2 style={{ color: primaryColor, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
          <ShieldCheck size={28} /> FRA Claim Form Wizard
        </h2>
        <div className="filter-pills" style={{ justifyContent: 'center', marginTop: '1rem' }}>
          <span className={`filter-pill ${step === 1 ? 'active' : ''}`}>Step 1: Select Form</span>
          <span className={`filter-pill ${step === 2 ? 'active' : ''}`}>Step 2: Details</span>
          <span className={`filter-pill ${step === 3 ? 'active' : ''}`}>Step 3: Evidence & Summary</span>
        </div>
      </div>

      {/* Step 1: Select Claim Form */}
      {step === 1 && (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h3 style={{ color: brownColor, marginBottom: '1rem' }}>Select Claim Type</h3>
          <div className="cards-grid">
            {formTypes.map(ft => (
              <div 
                key={ft.id} 
                className="info-card" 
                style={{ 
                  cursor: 'pointer', 
                  border: formType === ft.id ? `2px solid ${primaryColor}` : '1px solid #ccc',
                  backgroundColor: '#ffffff'
                }}
                onClick={() => setFormType(ft.id)}
              >
                <div className="card-badge" style={{ backgroundColor: formType === ft.id ? primaryColor : '#e0e0e0', color: formType === ft.id ? '#fff' : '#333' }}>
                  {ft.id}
                </div>
                <h4 className="card-title" style={{ marginTop: '1rem' }}>{ft.title}</h4>
                <p className="card-desc">{ft.desc}</p>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'right', marginTop: '2rem' }}>
            <button style={buttonStyle} onClick={() => setStep(2)}>
              Next Step <ArrowRight size={18} />
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Claimant & Village Details */}
      {step === 2 && (
        <div style={{ maxWidth: '800px', margin: '0 auto', backgroundColor: '#ffffff', padding: '2rem', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
          <h3 style={{ color: brownColor, marginBottom: '1.5rem' }}>Claimant & Village Details</h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Claimant/Community Name</label>
              <input type="text" name="claimantName" value={formData.claimantName} onChange={handleInputChange} className="filter-input" style={{ width: '100%' }} placeholder="Enter name" />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Spouse Name / FRC Chairperson</label>
              <input type="text" name="spouseOrCommunity" value={formData.spouseOrCommunity} onChange={handleInputChange} className="filter-input" style={{ width: '100%' }} placeholder="Enter name" />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Village/Hamlet</label>
              <input type="text" name="village" value={formData.village} onChange={handleInputChange} className="filter-input" style={{ width: '100%' }} placeholder="Enter village" />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Gram Panchayat</label>
              <input type="text" name="gramPanchayat" value={formData.gramPanchayat} onChange={handleInputChange} className="filter-input" style={{ width: '100%' }} placeholder="Enter panchayat" />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Tehsil/Block</label>
              <input type="text" name="block" value={formData.block} onChange={handleInputChange} className="filter-input" style={{ width: '100%' }} placeholder="Enter block" />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>District</label>
              <input type="text" name="district" value={formData.district} onChange={handleInputChange} className="filter-input" style={{ width: '100%' }} placeholder="Enter district" />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>State</label>
              <input type="text" name="state" value={formData.state} onChange={handleInputChange} className="filter-input" style={{ width: '100%' }} placeholder="Enter state" />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Land Area / Boundary Notes</label>
              <input type="text" name="claimDetails" value={formData.claimDetails} onChange={handleInputChange} className="filter-input" style={{ width: '100%' }} placeholder="e.g., 2 hectares" />
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
            <button style={secondaryButtonStyle} onClick={() => setStep(1)}>
              <ArrowLeft size={18} /> Back
            </button>
            <button style={buttonStyle} onClick={() => setStep(3)}>
              Next Step <ArrowRight size={18} />
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Rule 13 Evidence Checklist & Printable Summary */}
      {step === 3 && (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          
          <div style={{ backgroundColor: '#ffffff', padding: '2rem', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', marginBottom: '2rem' }}>
            <h3 style={{ color: brownColor, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <CheckSquare size={20} /> Rule 13 Evidence Checklist
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {evidenceOptions.map(ev => (
                <label key={ev.id} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', fontSize: '1rem' }}>
                  <input 
                    type="checkbox" 
                    checked={!!checkedDocs[ev.id]} 
                    onChange={() => handleDocToggle(ev.id)}
                    style={{ width: '1.2rem', height: '1.2rem', accentColor: primaryColor }}
                  />
                  {ev.label}
                </label>
              ))}
            </div>
          </div>

          {/* Printable Summary */}
          <div id="printable-summary" style={{ backgroundColor: '#ffffff', border: `2px solid ${primaryColor}`, padding: '2rem', borderRadius: '8px' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem', borderBottom: `1px solid ${brownColor}`, paddingBottom: '1rem' }}>
              <h2 style={{ color: primaryColor, margin: 0 }}>Claim Summary</h2>
              <p style={{ color: brownColor, fontWeight: 'bold', marginTop: '0.5rem' }}>Selected Form: {formTypes.find(f => f.id === formType)?.title}</p>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
              <p><strong>Claimant/Community:</strong> {formData.claimantName || 'N/A'}</p>
              <p><strong>Spouse / FRC Chair:</strong> {formData.spouseOrCommunity || 'N/A'}</p>
              <p><strong>Village:</strong> {formData.village || 'N/A'}</p>
              <p><strong>Gram Panchayat:</strong> {formData.gramPanchayat || 'N/A'}</p>
              <p><strong>Block:</strong> {formData.block || 'N/A'}</p>
              <p><strong>District:</strong> {formData.district || 'N/A'}</p>
              <p><strong>State:</strong> {formData.state || 'N/A'}</p>
              <p><strong>Land/Boundary Details:</strong> {formData.claimDetails || 'N/A'}</p>
            </div>

            <div style={{ borderTop: '1px solid #ccc', paddingTop: '1rem' }}>
              <h4 style={{ color: primaryColor }}>Attached Evidence ({Object.values(checkedDocs).filter(Boolean).length} selected)</h4>
              <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', marginTop: '0.5rem' }}>
                {evidenceOptions.filter(ev => checkedDocs[ev.id]).map(ev => (
                  <li key={ev.id}>{ev.label}</li>
                ))}
                {Object.values(checkedDocs).filter(Boolean).length === 0 && (
                  <li style={{ color: '#666', listStyleType: 'none', marginLeft: '-1.5rem' }}>No evidence selected.</li>
                )}
              </ul>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
            <button style={secondaryButtonStyle} onClick={() => setStep(2)}>
              <ArrowLeft size={18} /> Edit Details
            </button>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button style={{ ...buttonStyle, backgroundColor: brownColor }} onClick={resetWizard}>
                <RotateCcw size={18} /> Start New Claim
              </button>
              <button style={buttonStyle} onClick={() => window.print()}>
                <Printer size={18} /> Print / Save as PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClaimWizard;