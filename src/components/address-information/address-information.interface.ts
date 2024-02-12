export interface AddressInformationProps {
  onPrevious: () => void;
  onNext: () => void;
}

export interface IAddressInformationForm {
  address: string;
  city: string;
  state: string;
  zip: string;
}
