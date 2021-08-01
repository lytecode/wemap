import axios from "axios";
import { IAddress } from "../dto/address.dto";
import config from "../config";

class AddressService {
  async validateAddress(addressDTO: IAddress) {
    const { street, streetNumber, town, postalCode, country } = addressDTO;

    try {
      const { data } = await axios.get(
        `${config.NOMINATIM_BASE_API}/search.php?`,
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
    } catch (error) {
      return {
        error:
          "Unable to complete request at this time, please try again later",
      };
    }
  }

  async getWeather(addressDTO: IAddress) {
    const { street, streetNumber, town, postalCode, country } = addressDTO;
    let data;
    try {
      const result = await axios.get(
        `${config.NOMINATIM_BASE_API}/search.php?`,
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
      data = result.data;
    } catch (error) {
      return {
        error:
          "Unable to complete request at this time, please try again later",
      };
    }

    if (data.length === 0) {
      return { msg: "Address could not be found" };
    }

    const { lat, lon } = data[0];

    try {
      const { data: weather } = await axios.get(`${config.TIMER7_BASE_API}?`, {
        params: {
          lon,
          lat,
          product: "civillight",
          output: "json",
        },
      });

      return weather;
    } catch (error) {
      return {
        error:
          "Unable to complete request at this time, please try again later",
      };
    }
  }
}

export default new AddressService();
