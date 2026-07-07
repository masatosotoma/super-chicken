import React, { useState, useEffect } from 'react';
import { translations, menuData } from './menuData';
import './App.css';

export default function App() {
  const [language, setLanguage] = useState('en');
  const [activeCategory, setActiveCategory] = useState('all');
  const [menuModalOpen, setMenuModalOpen] = useState(false);
  const [headerScrolled, setHeaderScrolled] = useState(false);

  // Monitor scroll for sticky header styling
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setHeaderScrolled(true);
      } else {
        setHeaderScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const t = translations[language];

  // Helper to change language
  const changeLanguage = (lang) => {
    setLanguage(lang);
  };

  // Filter categories
  const filteredMenu = menuData.filter(item => 
    activeCategory === 'all' || item.category === activeCategory
  );

  return (
    <div className="App">
      {/* Sticky Header */}
      <header className={headerScrolled ? 'scrolled' : ''}>
        <div className="container nav-container">
          <a href="#" className="logo">
            <i className="fas fa-drumstick-bite"></i>
            Super <span>Chicken</span>
          </a>
          
          <ul className="nav-menu">
            <li><a href="#menu-section" className="nav-link">{t.catAll}</a></li>
            <li><a href="#menu-section" className="nav-link" onClick={() => changeLanguage('en')}>English</a></li>
            <li><a href="#menu-section" className="nav-link" onClick={() => changeLanguage('zh')}>中文</a></li>
          </ul>
          
          <div className="nav-actions">
            <div className="lang-toggle">
              <button 
                className={`lang-btn ${language === 'en' ? 'active' : ''}`}
                onClick={() => changeLanguage('en')}
              >EN</button>
              <button 
                className={`lang-btn ${language === 'zh' ? 'active' : ''}`}
                onClick={() => changeLanguage('zh')}
              >中文</button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-bg">
          <img src="images/hero.png" alt="Crispy Fried Chicken Hero Banner" />
        </div>
        <div className="container">
          <div className="hero-content">
            <span className="hero-badge">{t.heroBadge}</span>
            <h1 dangerouslySetInnerHTML={{ __html: t.heroTitle }}></h1>
            <p>{t.heroSubtitle}</p>
            <div className="hero-actions">
              <a href="#menu-section" className="btn btn-primary">
                <i className="fas fa-utensils"></i>
                <span>{t.orderNow}</span>
              </a>
              <button className="btn btn-secondary" onClick={() => setMenuModalOpen(true)}>
                <i className="fas fa-file-invoice"></i>
                <span>{t.viewMenuImg}</span>
              </button>
            </div>
          </div>
          <div className="hero-features">
            <div className="hero-promo-card">
              <span className="badge">{t.catCombos}</span>
              <h3 style={{ marginTop: '10px' }}>Combo G: Family Feast</h3>
              <p>2x Chicken Sandwiches + 1x Smash Chicken Cut + 1x Pop Chicken (M) + 1x Flame Fries (M) + 2x Drinks</p>
              <div className="promo-price">$34.59 <span>$46.50</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* Catalog Menu Area */}
      <main className="container section-padding" id="menu-section">
        <h2 className="section-title">{t.categoriesTitle}</h2>
        <p className="section-subtitle">{t.categoriesSubtitle}</p>
        
        {/* Scanned sheet box indicator */}
        <div className="menu-image-trigger-box">
          <div>
            <h4>纸质菜单扫描件 / Scanned Menu Sheet</h4>
            <p style={{ marginTop: '5px' }}>{t.originalMenuDesc}</p>
          </div>
          <button className="btn-outline-brown" onClick={() => setMenuModalOpen(true)}>
            <i className="fas fa-image"></i> <span>{t.btnViewSheet}</span>
          </button>
        </div>

        {/* Categories filters tabs bar */}
        <div className="menu-categories">
          <button 
            className={`category-tab ${activeCategory === 'all' ? 'active' : ''}`}
            onClick={() => setActiveCategory('all')}
          >{t.catAll}</button>
          <button 
            className={`category-tab ${activeCategory === 'chicken' ? 'active' : ''}`}
            onClick={() => setActiveCategory('chicken')}
          >{t.catChicken}</button>
          <button 
            className={`category-tab ${activeCategory === 'sandwich' ? 'active' : ''}`}
            onClick={() => setActiveCategory('sandwich')}
          >{t.catSandwiches}</button>
          <button 
            className={`category-tab ${activeCategory === 'sides' ? 'active' : ''}`}
            onClick={() => setActiveCategory('sides')}
          >{t.catSides}</button>
          <button 
            className={`category-tab ${activeCategory === 'combos' ? 'active' : ''}`}
            onClick={() => setActiveCategory('combos')}
          >{t.catCombos}</button>
        </div>

        {/* General Combos note banner */}
        {activeCategory === 'combos' && (
          <div style={{
            backgroundColor: 'var(--yellow-light)',
            borderLeft: '5px solid var(--yellow-primary)',
            padding: '15px 20px',
            borderRadius: 'var(--radius-sm)',
            marginBottom: '30px',
            fontSize: '0.9rem',
            fontWeight: '600',
            color: 'var(--brown-dark)',
            textAlign: 'left'
          }}>
            <i className="fas fa-info-circle" style={{ marginRight: '8px', color: 'var(--brown-medium)' }}></i>
            {t.comboNote}
          </div>
        )}

        {/* Items menu grid list */}
        <div className="menu-grid">
          {filteredMenu.map(item => {
            const comboLetter = item.comboLetter;
            const badgeText = item.badge ? item.badge[language] : null;

            return (
              <div className="menu-card" key={item.id}>
                <div className="menu-card-img-container">
                  {comboLetter && <div className="menu-card-combo-letter">{comboLetter}</div>}
                  <i className="fas fa-drumstick-bite menu-card-img-placeholder"></i>
                  {badgeText && <span className="badge menu-card-badge">{badgeText}</span>}
                </div>
                <div className="menu-card-content">
                  <div className="menu-card-header">
                    <h3 className="menu-card-title">{item.names[language]}</h3>
                    <span className="menu-card-price">${item.basePrice.toFixed(2)}</span>
                  </div>
                  <div className="menu-card-cal">
                    <i className="fas fa-fire"></i> {item.cal}
                  </div>
                  <p className="menu-card-description">{item.descriptions[language]}</p>
                  
                  {/* Static customization descriptors */}
                  {item.customType === 'spiciness' && (
                    <div className="menu-card-customizer" style={{ fontStyle: 'italic', fontWeight: '500', color: 'var(--brown-medium)' }}>
                      <i className="fas fa-pepper-hot" style={{ marginRight: '6px' }}></i>
                      {t.mildSpicyOption}
                    </div>
                  )}

                  {item.customType === 'sandwich' && (
                    <div className="menu-card-customizer">
                      <div className="customizer-title">{t.customAddons}</div>
                      <div style={{ display: 'flex', gap: '15px', color: 'var(--brown-medium)', fontWeight: '600', fontSize: '0.8rem' }}>
                        <span><i className="fas fa-plus" style={{ fontSize: '0.7rem', marginRight: '4px' }}></i> {t.customPineapple}</span>
                        <span><i className="fas fa-plus" style={{ fontSize: '0.7rem', marginRight: '4px' }}></i> {t.customCheese}</span>
                      </div>
                    </div>
                  )}

                  {item.customType === 'combo-sandwich' && (
                    <div className="menu-card-customizer">
                      <div className="customizer-title">{t.customAddons}</div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', color: 'var(--brown-medium)', fontWeight: '600', fontSize: '0.8rem' }}>
                        <div style={{ display: 'flex', gap: '15px' }}>
                          <span><i className="fas fa-plus" style={{ fontSize: '0.7rem', marginRight: '4px' }}></i> {t.customPineapple}</span>
                          <span><i className="fas fa-plus" style={{ fontSize: '0.7rem', marginRight: '4px' }}></i> {t.customCheese}</span>
                        </div>
                        <span><i className="fas fa-arrow-up" style={{ fontSize: '0.7rem', marginRight: '4px' }}></i> {t.customUpgradeCombo}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* Info Section */}
      <section className="info-section">
        <div className="container info-container-layout">
          <div className="info-grid">
            <div className="info-item">
              <div className="info-icon"><i className="fas fa-map-marker-alt"></i></div>
              <div className="info-text">
                <h4>{t.locationTitle}</h4>
                <p>{t.locDesc}</p>
              </div>
            </div>
            <div className="info-item">
              <div className="info-icon"><i className="fas fa-clock"></i></div>
              <div className="info-text">
                <h4>{t.hoursTitle}</h4>
                <p>{t.hoursDesc}</p>
              </div>
            </div>
            <div className="info-item">
              <div className="info-icon"><i className="fas fa-phone-alt"></i></div>
              <div className="info-text">
                <h4>{t.contactTitle}</h4>
                <p>{t.contactDesc}</p>
              </div>
            </div>
          </div>
          <div className="info-map">
            <iframe 
              src="https://www.google.com/maps?q=3517+Kennedy+Rd+%233,Scarborough,ON+M1V+4S4&amp;output=embed" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Super Chicken Location Map"
            ></iframe>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="container footer-grid">
          <div className="footer-col">
            <h4 className="logo" style={{ color: 'white', fontSize: '1.5rem', marginBottom: '20px' }}>
              <i className="fas fa-drumstick-bite" style={{ color: 'var(--yellow-primary)' }}></i> Super <span>Chicken</span>
            </h4>
            <p>Your local choice for the crispiest, juiciest, and most delicious takeout fried chicken in town.</p>
            <div className="social-links">
              <a href="#" className="social-link" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="social-link" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
              <a href="#" className="social-link" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
            </div>
          </div>
          <div className="footer-col">
            <h4>{t.locationTitle}</h4>
            <p><i className="fas fa-map-marker-alt"></i> {t.locDesc}</p>
            <p><i class="fas fa-phone-alt"></i> <a href="tel:+16473909898" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>+1 (647) 390-9898</a></p>
            <p><i className="fas fa-envelope"></i> contact@superchicken.com</p>
          </div>
          <div className="footer-col">
            <h4>{t.hoursTitle}</h4>
            <p>{t.hoursDesc}</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>{t.footerText}</p>
        </div>
      </footer>

      {/* Menu Image Modal overlay */}
      <div className={`image-modal ${menuModalOpen ? 'open' : ''}`} onClick={(e) => (e.target.id === 'image-modal' || e.target.classList.contains('btn-close-modal')) && setMenuModalOpen(false)}>
        <div className="image-modal-content">
          <button className="btn-close-modal">&times;</button>
          <img src="images/menu-1.png" alt="Super Chicken Printed Menu Scanned Sheet" />
        </div>
      </div>
    </div>
  );
}
