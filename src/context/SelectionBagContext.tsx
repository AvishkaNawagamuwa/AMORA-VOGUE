import React, { createContext, useContext, useState, useEffect } from 'react';
import { OrderItem } from '../utils/whatsapp';

export type AddItemInput =
  | Omit<OrderItem, 'id'>
  | {
      product: {
        id?: string;
        sku?: string;
        name?: string;
        title?: string;
        price: number;
        slug?: string;
        images?: string[];
        image?: string;
        [key: string]: any;
      };
      size: string;
      color: string;
      quantity: number;
    };

interface SelectionBagContextType {
  items: OrderItem[];
  addItem: (item: AddItemInput) => void;
  addToBag: (item: AddItemInput) => void;
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

  const addItem = (input: AddItemInput) => {
    let newItemData: Omit<OrderItem, 'id'>;
    if ('product' in input) {
      const p = input.product;
      newItemData = {
        name: p.name || p.title || 'Item',
        sku: p.sku || p.id || 'AV-ITEM',
        size: input.size,
        color: input.color,
        quantity: input.quantity || 1,
        unitPrice: p.price,
        image: (p.images && p.images[0]) || p.image || '',
        slug: p.slug || p.id,
      };
    } else {
      newItemData = input;
    }

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
        addToBag: addItem,
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
