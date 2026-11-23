import { useState } from "react";
import "./App.css";
import RightsNavigator from "./components/RightsNavigator";
import SchemeFinder from "./components/SchemeFinder";
import ClaimWizard from "./components/ClaimWizard";
import { Trees, Scale, HandHelping, FileText, ExternalLink } from "lucide-react";

function App() {
  const [activeTab, setActiveTab] = useState("rights");

  const content = {
    rights: {
      heading: "Know Your Forest Rights",
      subtitle: "A handbook to the Forest Rights Act, 2006: understand individual and community rights, the role of the Gram Sabha, and how to secure recognition of your claims."
    },
    schemes: {
      heading: "Tribal Welfare & Schemes",
      subtitle: "Discover government schemes for education, livelihood, agriculture, and health tailored for Adivasi empowerment."
    },
    wizard: {
      heading: "FRA Claim Form Wizard",
      subtitle: "An interactive step-by-step guide to prepare Form-A, Form-B, or Form-C claims with a printable Rule 13 evidence checklist."
    }
  }[activeTab];

  return (
    <div className="portal-container">
      <header className="navbar">
        <div className="nav-brand">
          <Trees size={28} />
          <div>
            <h1 style={{ margin: 0, fontSize: '1.25rem', color: '#fff' }}>Vangyan</h1>
            <p style={{ margin: 0, fontSize: '0.75rem', color: '#e2e8f0' }}>Adivasi Rights & Empowerment Portal</p>
          </div>
        </div>
        
        <nav className="nav-tabs">
          <button 
            className={`nav-tab ${activeTab === 'rights' ? 'active' : ''}`}
            onClick={() => setActiveTab('rights')}
          >
            <Scale size={18} />
            <span className="tab-text">Rights Navigator</span>
          </button>
          
          <button 
            className={`nav-tab ${activeTab === 'schemes' ? 'active' : ''}`}
            onClick={() => setActiveTab('schemes')}
          >
            <HandHelping size={18} />
            <span className="tab-text">Scheme Finder</span>
          </button>

          <button 
            className={`nav-tab ${activeTab === 'wizard' ? 'active' : ''}`}
            onClick={() => setActiveTab('wizard')}
          >
            <FileText size={18} />
            <span className="tab-text">Claim Wizard</span>
          </button>
        </nav>
      </header>

      <section className="hero-banner">
        <h1>{content.heading}</h1>
        <p>{content.subtitle}</p>
      </section>

      <main>
        {activeTab === 'rights' && <RightsNavigator />}
        {activeTab === 'schemes' && <SchemeFinder />}
        {activeTab === 'wizard' && <ClaimWizard />}
      </main>

      <footer style={{ textAlign: 'center', padding: '2rem', marginTop: '2rem', borderTop: '1px solid #d4d4d8', color: '#6b4423' }}>
        <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.9rem' }}>
          <strong>Academic Disclaimer:</strong> This portal is an educational tool. For official legal documentation, forms, and updates regarding the FRA, 2006, please visit the nodal agency:
        </p>
        <a 
          href="https://tribal.nic.in/FRA.aspx" 
          target="_blank" 
          rel="noopener noreferrer"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', color: '#1b4332', fontWeight: 'bold', textDecoration: 'none', backgroundColor: '#e2e8f0', padding: '0.5rem 1rem', borderRadius: '4px' }}
        >
          Ministry of Tribal Affairs (MoTA) - Official FRA Portal <ExternalLink size={16} />
        </a>
      </footer>
    </div>
  );
}

export default App;