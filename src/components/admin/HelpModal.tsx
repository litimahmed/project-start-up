import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface HelpModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const shortcuts = [
  { keys: ['⌘', 'K'], description: 'Ouvrir la recherche' },
  { keys: ['⌘', 'N'], description: 'Nouvelle réservation' },
  { keys: ['⌘', 'M'], description: 'Aller au menu' },
  { keys: ['⌘', 'R'], description: 'Aller aux réservations' },
  { keys: ['⌘', 'S'], description: 'Paramètres' },
  { keys: ['?'], description: 'Afficher l\'aide' },
];

const HelpModal = ({ open, onOpenChange }: HelpModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-gray-900">Raccourcis clavier</DialogTitle>
        </DialogHeader>
        <div className="space-y-3 mt-4">
          {shortcuts.map((shortcut, index) => (
            <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
              <span className="text-sm text-gray-600">{shortcut.description}</span>
              <div className="flex items-center gap-1">
                {shortcut.keys.map((key, keyIndex) => (
                  <kbd
                    key={keyIndex}
                    className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded font-mono border border-gray-200"
                  >
                    {key}
                  </kbd>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <p className="text-xs text-blue-600">
            💡 Astuce: Utilisez <kbd className="px-1.5 py-0.5 bg-white rounded text-[10px] border">⌘K</kbd> pour naviguer rapidement entre les pages.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default HelpModal;
