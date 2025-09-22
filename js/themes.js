// Theme Management System
class ThemeManager {
    constructor() {
        this.currentTheme = 'blue';
        this.customColors = {
            primary: '#3b82f6',
            secondary: '#10b981',
            background: '#f8fafc'
        };
        
        this.presetThemes = {
            blue: {
                primary: '#3b82f6',
                secondary: '#10b981',
                background: '#f8fafc',
                surface: '#ffffff',
                textPrimary: '#1f2937',
                textSecondary: '#6b7280',
                border: '#e5e7eb'
            },
            purple: {
                primary: '#8b5cf6',
                secondary: '#ec4899',
                background: '#faf5ff',
                surface: '#ffffff',
                textPrimary: '#1f2937',
                textSecondary: '#6b7280',
                border: '#e5e7eb'
            },
            green: {
                primary: '#10b981',
                secondary: '#059669',
                background: '#f0fdf4',
                surface: '#ffffff',
                textPrimary: '#1f2937',
                textSecondary: '#6b7280',
                border: '#e5e7eb'
            },
            orange: {
                primary: '#f97316',
                secondary: '#ea580c',
                background: '#fff7ed',
                surface: '#ffffff',
                textPrimary: '#1f2937',
                textSecondary: '#6b7280',
                border: '#e5e7eb'
            },
            pink: {
                primary: '#ec4899',
                secondary: '#be185d',
                background: '#fdf2f8',
                surface: '#ffffff',
                textPrimary: '#1f2937',
                textSecondary: '#6b7280',
                border: '#e5e7eb'
            },
            dark: {
                primary: '#60a5fa',
                secondary: '#34d399',
                background: '#111827',
                surface: '#1f2937',
                textPrimary: '#f9fafb',
                textSecondary: '#d1d5db',
                border: '#374151'
            }
        };
        
        this.init();
    }
    
    init() {
        this.loadSavedTheme();
        this.setupEventListeners();
        this.setupThemePanel();
    }
    
    loadSavedTheme() {
        const savedTheme = localStorage.getItem('studyhub-theme');
        const savedCustomColors = localStorage.getItem('studyhub-custom-colors');
        
        if (savedTheme) {
            this.currentTheme = savedTheme;
            this.applyTheme(savedTheme);
        }
        
        if (savedCustomColors) {
            this.customColors = JSON.parse(savedCustomColors);
            this.updateColorPickers();
        }
    }
    
    setupEventListeners() {
        const themeToggle = document.getElementById('themeToggle');
        const themePanel = document.querySelector('.theme-panel');
        const primaryColorPicker = document.getElementById('primaryColor');
        const secondaryColorPicker = document.getElementById('secondaryColor');
        const backgroundColorPicker = document.getElementById('backgroundColor');
        const resetThemeBtn = document.getElementById('resetTheme');
        const presetBtns = document.querySelectorAll('.preset-btn');
        
        // Toggle theme panel
        themeToggle.addEventListener('click', () => {
            themePanel.classList.toggle('active');
        });
        
        // Close panel when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.theme-customizer')) {
                themePanel.classList.remove('active');
            }
        });
        
        // Color picker events
        primaryColorPicker.addEventListener('change', (e) => {
            this.customColors.primary = e.target.value;
            this.applyCustomColors();
            this.saveCustomColors();
        });
        
        secondaryColorPicker.addEventListener('change', (e) => {
            this.customColors.secondary = e.target.value;
            this.applyCustomColors();
            this.saveCustomColors();
        });
        
        backgroundColorPicker.addEventListener('change', (e) => {
            this.customColors.background = e.target.value;
            this.applyCustomColors();
            this.saveCustomColors();
        });
        
        // Preset theme buttons
        presetBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const theme = btn.dataset.theme;
                this.applyTheme(theme);
                this.currentTheme = theme;
                this.saveTheme();
                themePanel.classList.remove('active');
            });
        });
        
        // Reset theme
        resetThemeBtn.addEventListener('click', () => {
            this.resetToDefault();
            themePanel.classList.remove('active');
        });
    }
    
    setupThemePanel() {
        this.updateColorPickers();
    }
    
    updateColorPickers() {
        document.getElementById('primaryColor').value = this.customColors.primary;
        document.getElementById('secondaryColor').value = this.customColors.secondary;
        document.getElementById('backgroundColor').value = this.customColors.background;
    }
    
    applyTheme(themeName) {
        const theme = this.presetThemes[themeName];
        if (!theme) return;
        
        const root = document.documentElement;
        
        root.style.setProperty('--primary-color', theme.primary);
        root.style.setProperty('--secondary-color', theme.secondary);
        root.style.setProperty('--background-color', theme.background);
        root.style.setProperty('--surface-color', theme.surface);
        root.style.setProperty('--text-primary', theme.textPrimary);
        root.style.setProperty('--text-secondary', theme.textSecondary);
        root.style.setProperty('--border-color', theme.border);
        
        // Update custom colors to match preset
        this.customColors = {
            primary: theme.primary,
            secondary: theme.secondary,
            background: theme.background
        };
        
        this.updateColorPickers();
        this.updateChartsTheme();
    }
    
    applyCustomColors() {
        const root = document.documentElement;
        
        root.style.setProperty('--primary-color', this.customColors.primary);
        root.style.setProperty('--secondary-color', this.customColors.secondary);
        root.style.setProperty('--background-color', this.customColors.background);
        
        this.updateChartsTheme();
    }
    
    updateChartsTheme() {
        // Update charts if they exist
        if (window.chartManager) {
            setTimeout(() => {
                chartManager.updateChartsForTheme();
            }, 100);
        }
    }
    
    saveTheme() {
        localStorage.setItem('studyhub-theme', this.currentTheme);
    }
    
    saveCustomColors() {
        localStorage.setItem('studyhub-custom-colors', JSON.stringify(this.customColors));
    }
    
    resetToDefault() {
        this.currentTheme = 'blue';
        this.customColors = {
            primary: '#3b82f6',
            secondary: '#10b981',
            background: '#f8fafc'
        };
        
        this.applyTheme('blue');
        this.saveTheme();
        this.saveCustomColors();
    }
    
    // Generate complementary colors
    generateComplementaryColor(hexColor) {
        // Convert hex to RGB
        const r = parseInt(hexColor.slice(1, 3), 16);
        const g = parseInt(hexColor.slice(3, 5), 16);
        const b = parseInt(hexColor.slice(5, 7), 16);
        
        // Generate complementary color
        const compR = 255 - r;
        const compG = 255 - g;
        const compB = 255 - b;
        
        // Convert back to hex
        return `#${compR.toString(16).padStart(2, '0')}${compG.toString(16).padStart(2, '0')}${compB.toString(16).padStart(2, '0')}`;
    }
    
    // Lighten or darken a color
    adjustBrightness(hexColor, percent) {
        const r = parseInt(hexColor.slice(1, 3), 16);
        const g = parseInt(hexColor.slice(3, 5), 16);
        const b = parseInt(hexColor.slice(5, 7), 16);
        
        const adjustedR = Math.round(r * (100 + percent) / 100);
        const adjustedG = Math.round(g * (100 + percent) / 100);
        const adjustedB = Math.round(b * (100 + percent) / 100);
        
        const clampedR = Math.max(0, Math.min(255, adjustedR));
        const clampedG = Math.max(0, Math.min(255, adjustedG));
        const clampedB = Math.max(0, Math.min(255, adjustedB));
        
        return `#${clampedR.toString(16).padStart(2, '0')}${clampedG.toString(16).padStart(2, '0')}${clampedB.toString(16).padStart(2, '0')}`;
    }
}

// Initialize theme manager
const themeManager = new ThemeManager();