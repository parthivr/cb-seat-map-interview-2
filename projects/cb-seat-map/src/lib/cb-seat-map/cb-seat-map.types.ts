export interface CbSeat {
  exitSeat: boolean;
  evenMoreSpaceSeat: boolean;
  bulkheadAisle: boolean;
  label: string;
  position: string;
  seatGroupId?: string;
  seatNum?: string;
  number?: string;
  type?: string;
  iconCode?: string;
  characteristic: string[];
  priceUri?: string;
  redeemPriceUri?: string;
  fareClass?: string;
  cost?: number;
  rowSide?: string;
  redeemPoints?: number;
  useTrueBluePoints?: boolean;
  seatInfo?: string;
  initials?: string;
  evenMoreSpacePlusSeat?: boolean;
  travelerSeatRefUri?: CbTravelerSeatRef[];
  seatUri?: string;
  travelerRedeemPriceUri?: string[];
  displaySeatType?: string;
  available?: string;
  currency?: string;
}

export interface CmsContent {
  [key: string]: string | any;
}

export enum CabinTypeEnum {
  economy = 'ECONOMY',
  business = 'BUSINESS',
}

export enum CbSeatType {
  Core = 'CORE',
  Preferred = 'PREFERRED',
  EvenMoreSpace = 'EVEN_MORE_SPACE',
  Mint = 'MINT',
  MintSuite = 'MINT_SUITE',
  NoSeat = 'NO_SEAT',
  Unknown = 'UNKNOWN',
}

export enum CbSeatTypeEnum {
  CORE = 'core',
  MINT = 'mint',
  EM = 'em',
  EMSP = 'emsPlus',
  MINTSTUDIO = 'mintStudio',
  MINTSUITE = 'mintSuite',
  EVENMORESPACE = 'ems',
  PREFERRED = 'preferred',
}

export const seatClassName: Record<CbSeatTypeEnum | string, string> = {
  [CbSeatTypeEnum.CORE]: '.seat-map-container jb-seat.core',
  [CbSeatTypeEnum.MINT]: '.seat-map-container jb-seat.mint',
  [CbSeatTypeEnum.EM]: '.seat-map-container jb-seat.evenMore',
  [CbSeatTypeEnum.PREFERRED]: '.seat-map-container jb-seat.preferred',
  [CbSeatTypeEnum.MINTSTUDIO]: '.seat-map-container jb-seat.mintStudio',
};

export interface LearnMorePanelDetails {
  seatType: CbSeatTypeEnum;
  isOpen: boolean;
  from?: string;
}

export interface CbTravelerSeatRef {
  priceUri?: string;
  seatUri?: string;
  travelerId?: string;
  type?: string;
  cost?: number;
  redeemPoints?: number;
  redeemPriceUri?: string;
}

export interface CbSeatRow {
  cols: CbSeat[];
  number: string;
  overWing: boolean;
  evenMoreSpaceRow: boolean;
  leftSideExitRow: boolean;
  rightSideExitRow: boolean;
  mintRow: boolean;
  aisleIndex?: number;
  displaySeatType?: string;
}

export interface CbCabin {
  cabinType: CabinTypeEnum;
  cabinClass: string;
  layout: string[];
  rows: CbSeatRow[];
}

export interface CbSeatGroup {
  isSeatGroupAvailable?: boolean;
  seatGroupId: string;
  seats: number;
  available: number;
}

export interface CbSeatLegend {
  iconCode: string;
  displayName: string;
  minPrice?: number;
  maxPrice?: number;
  sortOrder?: number;
  minPoints?: number;
  maxPoints?: number;
}

export interface CbAirCraft {
  code: string;
  name: string;
}

export interface CbSeatMap {
  id?: string;
  seatMapUri?: string | string[];
  segmentId?: string;
  cabins?: CbCabin[];
  passengerSeatGroups?: Readonly<{ seatGroups: CbSeatGroup[] }>[];
  legend?: CbSeatLegend[];
  noFreeSeat?: boolean;
  rmdEMSSeats?: CbSeat[];
  rmdCoreSeats?: CbSeat[];
  aircraft?: CbAirCraft;
  emsPlusAvailable?: boolean;
  currency?: string;
}

export interface CbSeatRow {
  cols: CbSeat[];
  number: string;
  overWing: boolean;
  evenMoreSpaceRow: boolean;
  leftSideExitRow: boolean;
  rightSideExitRow: boolean;
  mintRow: boolean;
  aisleIndex?: number;
  displaySeatType?: string;
}

export interface CbSeatMaps {
  seatMapResponse: CbSeatMap;
  seatMapUri: string[];
  segmentId: string;
}

export type CbSeatSelectionData = {
  leg?: {
    departure?: string;
    departureDateTime?: string;
    destination?: string;
    flightNumber?: string;
    origin?: string;
    rules?: any[];
  };

  seat?: {
    available?: string;
    cost?: number | string;
    displaySeatType?: string;
    evenMoreSpaceSeat?: boolean;
    iconCode?: string;
    label?: string;
    position?: string;
    seatInfo?: string;
    seatNum?: string;
    side?: string;
    travelerSeatRefUri?: any[];
    type?: string;
    initials?: string;
  };

  traveler?: {
    availableSeats?: string[];
    extendedType?: string;
    index?: number;
    initials?: string;
    isActive?: boolean;
    name?: {
      first?: string;
      last?: string;
    };

    offers?: {
      amount?: number;
      currency?: string;
      seatNumber?: string;
      type?: string;
    }[];

    selectedSeat?: string;
    type?: string;
  };
};
