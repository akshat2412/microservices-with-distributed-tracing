import fs from "fs";
import { OrderList, Order } from "../Shared/Models";

export class OrderDbContext {
    private _orderList: OrderList;

    // Read seed data from data file, and store in in-memory list for further use.
    constructor() {
        let fileData = fs.readFileSync('src/Data/order.data.json');
        this._orderList = JSON.parse(fileData.toString()) as OrderList;
    }

    // Returns the order information object based on passed parameter.
    public getOrder = async (orderId: string) => {
        return this._orderList.orderList.find((order: Order) => {
            return order.id === orderId;
        });
    }

    public getUserOrders = async (username: string) => {
        return this._orderList.orderList.filter((order: Order) => {
            return order.username === username;
        });
    }
}