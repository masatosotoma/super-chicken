import React, { useState, useEffect } from 'react';
import { translations, menuData } from './menuData';
import './App.css';

export default function App() {
  const [language, setLanguage] = useState('en');
  const [activeCategory, setActiveCategory] = useState('all');
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [menuModalOpen, setMenuModalOpen] = useState(false);
  const [receiptModalOpen, setReceiptModalOpen] = useState(false);
  const [receiptInfo, setReceiptInfo] = useState({ orderId: '', time: '', total: 0 });
  const [toasts, setToasts] = useState([]);
  const [headerScrolled, setHeaderScrolled] = useState(false);

  // Maintain custom inputs for each menu item card
  const [itemSelections, setItemSelections] = useState({});

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

  // Set default values for customizations when menu loads
  useEffect(() => {
    const initialSelections = {};
    menuData.forEach(item => {
      if (item.customType === 'spiciness') {
        initialSelections[item.id] = { spice: 'mild' };
      } else if (item.customType === 'sandwich') {
        initialSelections[item.id] = { pineapple: false, cheese: false };
      } else if (item.customType === 'combo-sandwich') {
        initialSelections[item.id] = { pineapple: false, cheese: false, upgradeBBQ: false };
      }
    });
    setItemSelections(initialSelections);
  }, []);

  const t = translations[language];

  // Helper to change language
  const changeLanguage = (lang) => {
    setLanguage(lang);
  };

  // Helper to trigger toast notifications
  const triggerToast = () => {
    const newToast = { id: Date.now(), message: t.toastAdded };
    setToasts(prev => [...prev, newToast]);
    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== newToast.id));
    }, 3000);
  };

  // Handle option changes
  const handleRadioChange = (itemId, val) => {
    setItemSelections(prev => ({
      ...prev,
      [itemId]: { ...prev[itemId], spice: val }
    }));
  };

  const handleCheckboxChange = (itemId, optionKey) => {
    setItemSelections(prev => ({
      ...prev,
      [itemId]: { ...prev[itemId], [optionKey]: !prev[itemId][optionKey] }
    }));
  };

  // Add to Cart
  const addToOrder = (itemId) => {
    const item = menuData.find(m => m.id === itemId);
    if (!item) return;

    let customizedTextEN = [];
    let customizedTextZH = [];
    let addedPrice = 0;

    const select = itemSelections[itemId] || {};

    if (item.customType === 'spiciness') {
      const spiceVal = select.spice || 'mild';
      if (spiceVal === 'spicy') {
        customizedTextEN.push("Spicy");
        customizedTextZH.push("辣");
      } else {
        customizedTextEN.push("Mild");
        customizedTextZH.push("不辣");
      }
    } else if (item.customType === 'sandwich' || item.customType === 'combo-sandwich') {
      if (select.pineapple) {
        customizedTextEN.push("Add Pineapple (+$1.00)");
        customizedTextZH.push("加菠萝 (+$1.00)");
        addedPrice += 1.00;
      }
      if (select.cheese) {
        customizedTextEN.push("Add Cheese (+$1.50)");
        customizedTextZH.push("加芝士 (+$1.50)");
        addedPrice += 1.50;
      }
      if (select.upgradeBBQ) {
        customizedTextEN.push("BBQ Upgrade (+$1.00)");
        customizedTextZH.push("升级BBQ烧烤酱 (+$1.00)");
        addedPrice += 1.00;
      }
    }

    const uniqueCustomKey = customizedTextEN.join(" | ");
    const itemTotalPrice = item.basePrice + addedPrice;

    // Check if duplicate exists
    setCart(prevCart => {
      const existingIndex = prevCart.findIndex(
        c => c.id === itemId && c.customKey === uniqueCustomKey
      );

      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].qty += 1;
        return updated;
      } else {
        return [
          ...prevCart,
          {
            id: itemId,
            nameEN: item.names.en,
            nameZH: item.names.zh,
            basePrice: item.basePrice,
            customPrice: addedPrice,
            totalSinglePrice: itemTotalPrice,
            qty: 1,
            customKey: uniqueCustomKey,
            customEN: customizedTextEN,
            customZH: customizedTextZH
          }
        ];
      }
    });

    triggerToast();
  };

  // Modify cart item quantity
  const updateCartQty = (index, change) => {
    setCart(prevCart => {
      const updated = [...prevCart];
      updated[index].qty += change;
      if (updated[index].qty <= 0) {
        updated.splice(index, 1);
      }
      return updated;
    });
  };

  // Remove item from cart
  const removeCartItem = (index) => {
    setCart(prevCart => prevCart.filter((_, i) => i !== index));
  };

  // Cart Calculations
  const cartQtyCount = cart.reduce((acc, curr) => acc + curr.qty, 0);
  const subtotal = cart.reduce((acc, curr) => acc + (curr.totalSinglePrice * curr.qty), 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  // Checkout Receipt Trigger
  const handleCheckout = () => {
    if (cart.length === 0) return;

    const orderNumber = "SC-" + Math.floor(1000 + Math.random() * 9000);
    const now = new Date();
    now.setMinutes(now.getMinutes() + 20);
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setReceiptInfo({
      orderId: orderNumber,
      time: timeStr,
      total: total
    });

    setCartOpen(false);
    setReceiptModalOpen(true);
  };

  const handleCloseReceipt = () => {
    setReceiptModalOpen(false);
    setCart([]);
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
          
          <div class="nav-actions">
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
            
            <button className="cart-toggle-btn" onClick={() => setCartOpen(true)} aria-label="Open Shopping Cart">
              <i className="fas fa-shopping-basket"></i>
              <span className="cart-count">{cartQtyCount}</span>
            </button>
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
        <p class="section-subtitle">{t.categoriesSubtitle}</p>
        
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

        {/* Items menu grid list */}
        <div className="menu-grid">
          {filteredMenu.map(item => {
            const select = itemSelections[item.id] || {};
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
                  
                  {/* Embedded customization options */}
                  {item.customType === 'spiciness' && (
                    <div className="menu-card-customizer">
                      <div className="customizer-title">{t.customSpicy}</div>
                      <div className="radio-group">
                        <div className="customizer-option">
                          <label>
                            <input 
                              type="radio" 
                              name={`spice-${item.id}`} 
                              value="mild" 
                              checked={select.spice !== 'spicy'} 
                              onChange={() => handleRadioChange(item.id, 'mild')}
                            />
                            <span>{t.customSpicyMild}</span>
                          </label>
                        </div>
                        <div className="customizer-option">
                          <label>
                            <input 
                              type="radio" 
                              name={`spice-${item.id}`} 
                              value="spicy" 
                              checked={select.spice === 'spicy'} 
                              onChange={() => handleRadioChange(item.id, 'spicy')}
                            />
                            <span>{t.customSpicyHot}</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  )}

                  {item.customType === 'sandwich' && (
                    <div className="menu-card-customizer">
                      <div className="customizer-title">{t.customAddons}</div>
                      <div className="customizer-options">
                        <div className="customizer-option">
                          <label>
                            <input 
                              type="checkbox" 
                              checked={!!select.pineapple} 
                              onChange={() => handleCheckboxChange(item.id, 'pineapple')}
                            />
                            <span>{t.customPineapple}</span>
                          </label>
                        </div>
                        <div className="customizer-option">
                          <label>
                            <input 
                              type="checkbox" 
                              checked={!!select.cheese} 
                              onChange={() => handleCheckboxChange(item.id, 'cheese')}
                            />
                            <span>{t.customCheese}</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  )}

                  {item.customType === 'combo-sandwich' && (
                    <div className="menu-card-customizer">
                      <div className="customizer-title">{t.customAddons}</div>
                      <div className="customizer-options">
                        <div className="customizer-option">
                          <label>
                            <input 
                              type="checkbox" 
                              checked={!!select.pineapple} 
                              onChange={() => handleCheckboxChange(item.id, 'pineapple')}
                            />
                            <span>{t.customPineapple}</span>
                          </label>
                        </div>
                        <div className="customizer-option">
                          <label>
                            <input 
                              type="checkbox" 
                              checked={!!select.cheese} 
                              onChange={() => handleCheckboxChange(item.id, 'cheese')}
                            />
                            <span>{t.customCheese}</span>
                          </label>
                        </div>
                        <div className="customizer-option">
                          <label>
                            <input 
                              type="checkbox" 
                              checked={!!select.upgradeBBQ} 
                              onChange={() => handleCheckboxChange(item.id, 'upgradeBBQ')}
                            />
                            <span>{t.customUpgradeCombo}</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="menu-card-actions">
                    <button className="btn-add-to-cart" onClick={() => addToOrder(item.id)}>
                      <i className="fas fa-plus-circle"></i>
                      <span>{t.addToCart}</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* Info Section */}
      <section className="info-section">
        <div className="container info-grid">
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
              <a href="#" className="social-link" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
              <a href="#" class="social-link" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
              <a href="#" class="social-link" aria-label="Twitter"><i class="fab fa-twitter"></i></a>
            </div>
          </div>
          <div className="footer-col">
            <h4>{t.locationTitle}</h4>
            <p><i className="fas fa-map-marker-alt"></i> 123 Crispy Boulevard, Food Town</p>
            <p><i className="fas fa-phone-alt"></i> +1 (555) 123-4567</p>
            <p><i className="fas fa-envelope"></i> contact@superchicken.com</p>
          </div>
          <div className="footer-col">
            <h4>{t.hoursTitle}</h4>
            <p>Monday - Friday: 11:00 AM - 10:00 PM</p>
            <p>Saturday - Sunday: 11:00 AM - 11:00 PM</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>{t.footerText}</p>
        </div>
      </footer>

      {/* Shopping Cart Side Drawer */}
      <div className={`cart-overlay ${cartOpen ? 'open' : ''}`} onClick={(e) => e.target.classList.contains('cart-overlay') && setCartOpen(false)}>
        <div className="cart-drawer">
          <div className="cart-header">
            <h3>{t.cartTitle}</h3>
            <button className="btn-close-cart" onClick={() => setCartOpen(false)} aria-label="Close Shopping Cart">&times;</button>
          </div>
          
          <div className="cart-body">
            {cart.length === 0 ? (
              <div className="cart-empty">
                <i className="fas fa-shopping-basket cart-empty-icon"></i>
                <p>{t.cartEmpty}</p>
              </div>
            ) : (
              cart.map((cItem, index) => {
                const itemCost = cItem.totalSinglePrice * cItem.qty;
                const customNotes = language === 'en' ? cItem.customEN.join(", ") : cItem.customZH.join(", ");
                const nameDisplay = language === 'en' ? cItem.nameEN : cItem.nameZH;

                return (
                  <div className="cart-item" key={cItem.id + '-' + cItem.customKey}>
                    <div className="cart-item-header">
                      <span className="cart-item-title">{nameDisplay}</span>
                      <span className="cart-item-price">${itemCost.toFixed(2)}</span>
                    </div>
                    {customNotes && <div className="cart-item-customizations">{customNotes}</div>}
                    <div className="cart-item-actions">
                      <div className="qty-control">
                        <button className="qty-btn" onClick={() => updateCartQty(index, -1)}>-</button>
                        <span className="qty-val">{cItem.qty}</span>
                        <button className="qty-btn" onClick={() => updateCartQty(index, 1)}>+</button>
                      </div>
                      <button className="btn-remove-item" onClick={() => removeCartItem(index)}>Remove</button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
          
          <div className="cart-footer">
            <div className="cart-summary-line">
              <span>{t.subtotal}</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="cart-summary-line">
              <span>{t.tax}</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="cart-summary-line total">
              <span>{t.total}</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <button 
              className="btn-checkout" 
              onClick={handleCheckout} 
              disabled={cart.length === 0}
            >
              {t.checkout}
            </button>
          </div>
        </div>
      </div>

      {/* Menu Image Modal overlay */}
      <div className={`image-modal ${menuModalOpen ? 'open' : ''}`} onClick={(e) => (e.target.id === 'image-modal' || e.target.classList.contains('btn-close-modal')) && setMenuModalOpen(false)}>
        <div className="image-modal-content">
          <button className="btn-close-modal">&times;</button>
          <img src="images/menu-1.png" alt="Super Chicken Printed Menu Scanned Sheet" />
        </div>
      </div>

      {/* Checkout Success Receipt Sheet Modal */}
      <div className={`receipt-modal ${receiptModalOpen ? 'open' : ''}`} onClick={(e) => e.target.id === 'receipt-modal' && handleCloseReceipt()}>
        <div className="receipt-card">
          <div className="receipt-header">
            <h3>{t.receiptSuccess}</h3>
            <p>Super Chicken Takeout</p>
            <span className="receipt-success-badge"><i className="fas fa-check-circle"></i> Paid / Prep in Progress</span>
          </div>
          
          <div className="receipt-body">
            <div className="receipt-info-block">
              <div className="receipt-info-row">
                <span className="receipt-label">{t.receiptOrderNum}</span>
                <span className="receipt-value">{receiptInfo.orderId}</span>
              </div>
              <div className="receipt-info-row">
                <span className="receipt-label">{t.receiptTime}</span>
                <span className="receipt-value">{receiptInfo.time}</span>
              </div>
            </div>
            
            <div className="receipt-items-list">
              {cart.map((cItem, i) => {
                const itemCost = cItem.totalSinglePrice * cItem.qty;
                const customNotes = language === 'en' ? cItem.customEN.join(", ") : cItem.customZH.join(", ");
                const nameDisplay = language === 'en' ? cItem.nameEN : cItem.nameZH;

                return (
                  <div style={{ marginBottom: '15px' }} key={i}>
                    <div className="receipt-item-row">
                      <span className="receipt-item-desc">{cItem.qty}x {nameDisplay}</span>
                      <span className="receipt-item-p">${itemCost.toFixed(2)}</span>
                    </div>
                    {customNotes && <div className="receipt-item-subnotes">+ {customNotes}</div>}
                  </div>
                );
              })}
            </div>
            
            <div className="receipt-total-block">
              <div className="receipt-total-row">
                <span>{t.total}</span>
                <span>${receiptInfo.total.toFixed(2)}</span>
              </div>
            </div>
            
            <div className="receipt-instructions">
              <h5><i className="fas fa-info-circle"></i> {t.receiptInstructionsTitle}</h5>
              <p>{t.receiptInstructions}</p>
            </div>
            
            <button className="btn-done-receipt" onClick={handleCloseReceipt}>{t.receiptClose}</button>
          </div>
        </div>
      </div>

      {/* Floating Toast Alerts Stack */}
      <div className="toast-container">
        {toasts.map(toast => (
          <div className="toast" key={toast.id}>
            <i className="fas fa-check-circle"></i>
            <span>{toast.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
