import { Request, Response } from "express";
import AddressService from "./address.service";

class AddressController {
  async getAddress(req: Request, res: Response) {
    const address = await AddressService.validateAddress(req.body);
    return res.status(200).json(address);
  }

  async checkWeather(req: Request, res: Response) {
    const weather = await AddressService.getWeather(req.body);
    return res.status(200).json(weather);
  }
}

export default new AddressController();
