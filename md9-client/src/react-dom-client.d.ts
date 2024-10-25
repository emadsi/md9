declare module 'react-dom/client' {
    import { ReactElement } from 'react';
    import { Root } from 'react-dom';
  
    export function createRoot(container: Element | DocumentFragment): Root;
    export interface Root {
      render(element: ReactElement): void;
      unmount(): void;
    }
  }  