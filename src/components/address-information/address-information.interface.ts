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

export interface IStateCityZip {
  name: string;
  cities: {
    name: string;
    zip: string[];
  }[];
}

export interface IStateData {
  name: string;
  zip: string[];
}
