import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { AppLayout } from './components/layout/AppLayout';
import { Header } from './components/layout/Header';
import { BottomNav } from './components/layout/BottomNav';
import { ListDetail } from './components/lists/ListDetail';
import { AddItemModal } from './components/lists/AddItemModal';
import { ListsManagerModal } from './components/lists/ListsManagerModal';
import { PriceComparator } from './components/compare/PriceComparator';
import { ReceiptScanner } from './components/scanner/ReceiptScanner';
import { PantryManager } from './components/pantry/PantryManager';
import { RecipeHub } from './components/recipes/RecipeHub';
import { ExpenseAnalytics } from './components/analytics/ExpenseAnalytics';
import { ShareModal } from './components/common/ShareModal';

function MainApp() {
  const { activeTab } = useApp();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isListsModalOpen, setIsListsModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  return (
    <AppLayout>
      {/* Top Header */}
      <Header
        onOpenListsModal={() => setIsListsModalOpen(true)}
        onOpenShareModal={() => setIsShareModalOpen(true)}
      />

      {/* Dynamic Tab Content */}
      {activeTab === 'list' && (
        <ListDetail
          onOpenAddModal={() => setIsAddModalOpen(true)}
        />
      )}

      {activeTab === 'compare' && <PriceComparator />}
      {activeTab === 'scanner' && <ReceiptScanner />}
      {activeTab === 'pantry' && <PantryManager />}
      {activeTab === 'recipes' && <RecipeHub />}
      {activeTab === 'analytics' && <ExpenseAnalytics />}

      {/* Bottom Navigation Bar */}
      <BottomNav />

      {/* Modals */}
      <AddItemModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />

      <ListsManagerModal
        isOpen={isListsModalOpen}
        onClose={() => setIsListsModalOpen(false)}
      />

      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
      />
    </AppLayout>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainApp />
    </AppProvider>
  );
}
