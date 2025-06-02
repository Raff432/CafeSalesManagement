import React, { useEffect, useState, createContext, useContext } from 'react';
type FontSize = 'small' | 'medium' | 'large';
interface FontSizeContextType {
  fontSize: FontSize;
  setFontSize: (size: FontSize) => void;
}
const FontSizeContext = createContext<FontSizeContextType | undefined>(undefined);
export function FontSizeProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const [fontSize, setFontSize] = useState<FontSize>(() => {
    const saved = localStorage.getItem('fontSize') as FontSize;
    return saved || 'medium';
  });
  useEffect(() => {
    localStorage.setItem('fontSize', fontSize);
    document.documentElement.style.fontSize = {
      small: '14px',
      medium: '16px',
      large: '18px'
    }[fontSize];
  }, [fontSize]);
  return <FontSizeContext.Provider value={{
    fontSize,
    setFontSize
  }}>
      {children}
    </FontSizeContext.Provider>;
}
export const useFontSize = () => {
  const context = useContext(FontSizeContext);
  if (context === undefined) {
    throw new Error('useFontSize must be used within a FontSizeProvider');
  }
  return context;
};