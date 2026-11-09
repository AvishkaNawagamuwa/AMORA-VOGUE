import React, { createContext, useContext, useState, useEffect } from 'react';
import { OrderItem } from '../utils/whatsapp';

interface SelectionBagContextType {
  items: OrderItem[];
  addItem: (item: Omit<OrderItem, 'id'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, newQty: number) => void;
  clearBag: () => void;
  totalItems: number;
  subtotal: number;
  isDrawerOpen: boolean;
  setIsDrawerOpen: (open: boolean) => void;
  toggleDrawer: () => void;
  lastAddedItem: OrderItem | null;
}

const SelectionBagContext = createContext<SelectionBagContextType | undefined>(undefined);

const STORAGE_KEY = 'amora_vogue_selection_bag_v1';

export const SelectionBagProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<OrderItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to parse selection bag from localStorage', e);
    }
    return [];
  });

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [lastAddedItem, setLastAddedItem] = useState<OrderItem | null>(null);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error('Failed to save selection bag to localStorage', e);
    }
  }, [items]);

  const addItem = (newItemData: Omit<OrderItem, 'id'>) => {
    // Generate unique ID based on SKU, size and color
    const itemId = `${newItemData.sku}-${newItemData.size}-${newItemData.color}`.toLowerCase().replace(/\s+/g, '-');

    setItems((prevItems) => {
      const existingIndex = prevItems.findIndex((item) => item.id === itemId);

      if (existingIndex > -1) {
        // Variant already exists -> increase quantity
        const updated = [...prevItems];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + newItemData.quantity,
        };
        setLastAddedItem(updated[existingIndex]);
        return updated;
      } else {
        const itemWithId: OrderItem = {
          ...newItemData,
          id: itemId,
        };
        setLastAddedItem(itemWithId);
        return [...prevItems, itemWithId];
      }
    });

    // Automatically open drawer to confirm selection
    setIsDrawerOpen(true);
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, newQty: number) => {
    if (newQty <= 0) {
      removeItem(id);
      return;
    }
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: newQty } : item))
    );
  };

  const clearBag = () => {
    setItems([]);
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);

  const toggleDrawer = () => setIsDrawerOpen((prev) => !prev);

  return (
    <SelectionBagContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearBag,
        totalItems,
        subtotal,
        isDrawerOpen,
        setIsDrawerOpen,
        toggleDrawer,
        lastAddedItem,
      }}
    >
      {children}
    </SelectionBagContext.Provider>
  );
};

export const useSelectionBag = () => {
  const context = useContext(SelectionBagContext);
  if (!context) {
    throw new Error('useSelectionBag must be used within a SelectionBagProvider');
  }
  return context;
};
