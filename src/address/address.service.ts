import axios from "axios";
import { IAddress } from "../dto/address.dto";

class AddressService {
  async validateAddress(addressDTO: IAddress) {
    const { street, streetNumber, town, postalCode, country } = addressDTO;

    const { data } = await axios.get(
      `${process.env.NOMINATIM_BASE_API}/search.php?`,
      {
        params: {
          street: `${streetNumber}, ${street}`,
          city: town,
          postalcode: postalCode,
          country,
          format: "json",
        },
      }
    );

    return data;
  }

  async getWeather(addressDTO: IAddress) {
    const { street, streetNumber, town, postalCode, country } = addressDTO;

    const { data } = await axios.get(
      `${process.env.NOMINATIM_BASE_API}/search.php?`,
      {
        params: {
          street: `${streetNumber}, ${street}`,
          city: town,
          postalcode: postalCode,
          country,
          format: "json",
        },
      }
    );

    if (data.length === 0) {
      return { msg: "Address could not be found" };
    }

    const { lat, lon } = data[0];

    const { data: weather } = await axios.get(
      `${process.env.TIMER7_BASE_API}?`,
      {
        params: {
          lon,
          lat,
          product: "civillight",
          output: "json",
        },
      }
    );

    return weather;
  }
}

export default new AddressService();
