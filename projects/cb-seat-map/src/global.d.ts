declare global {
  interface Window {
    __CB_SEAT_MAP__?: {
      /**
       * The version of the cb-seat-map library, set for debugging purposes.
       *
       * @example "0.0.13"
       */
      version: string;
    };
  }
}

// This export statement is required to make this file a module
export {};
