/* Order SQL Generator

Quickly generates an SQL script which creates a large number
of mock orders in the database when run.

It is useful for demonstrating how rating the items creates a
review score, since this is a statistic rather than something
inherent in the data itself.
*/ 

class SQLType{
    name: string;
    min: number;
    max: number;

    constructor(name: string, min: number, max: number){
        this.name = name;
        this.min = min;
        this.max = max;
    }
}

class ScriptRunner{

    menuItem: SQLType;
    orders: SQLType;
    orderItem: SQLType;
    review: SQLType;
    customer: SQLType;
    menuItemAdjuster: number[];

    constructor(){
        this.menuItem = new SQLType('menu', 1, 13);
        // min and max must be valid menu items (chosen randomly)
        this.menuItemAdjuster = [-10, 8, 7, -18, 5, 6, -17, 7, 11, -20, 2, -5];
        // menu item adjuster will increase or decrease the likelihood
        // of a positive review (values in percent)
        this.orders = new SQLType('orders', 5, 0);
        // min is the start point for creating orders
        this.orderItem = new SQLType('order_item', 9, 0);
        // min is the start point for creating order items
        this.review = new SQLType('review', 5, 0);
        // min is the start point for creating reviews
        this.customer = new SQLType('cust_t', 1, 3);
        // min and max must be valid customers (chosen randomly)
    }

    insert(table: SQLType, columns: string[], values: string[]): string{
        let ret: string = `INSERT INTO ${table.name}
            (`; 
        for (let i in columns){
            ret += (Number(i) == 0) ? columns[i] : ", "+columns[i];
        }
        ret += ") \n    VALUES (";
        for (let i in values){
            ret += (Number(i) == 0) ? values[i] : ", "+values[i];
        }
        ret += ");";
        return ret;
    }

    update(table: SQLType, set: string, whereField: string,
         whereCondition: string): string{
        return `UPDATE ${table.name}
            SET ${set}
            WHERE ${whereField} = ${whereCondition};`;
    }
    random(type: SQLType, removed?: string[]): string{
        let max = type.max;
        let min = type.min;
        if (removed == undefined || removed.length == 0) return String(
            Math.floor(Math.random() * (max - min + 1)) + min);
        if (removed.length >= max - min) return null;
        let vals: string[] = [];
        for (let i = 0; i <= max - min; i++){
            vals.push(String(min+i));
        }
        removed.forEach( item => {
            let x: number = vals.indexOf(item);
            if (x != -1) vals.splice(x,1);
        });
        return vals[Math.floor(Math.random() * (vals.length))];
    }

    generate(count: number): string[]{
        const orderColumns: string[] = ["order_id", "cust_id",
            "rev_id", "price", "status", "address_id",
            "submitted_time", "last_action"];
        const orderItemColumns: string[] = ["item_id", "order_id",
            "menu_item", "quantity"];
        const reviewColumns: string[] = ["review_id", "good_rating",
            "comments"];
        let orderValues: string[] = ["0", "0", "NULL", "0", "'COMPLETED'",
            "NULL", "CURRENT_TIMESTAMP", "CURRENT_TIMESTAMP"]; 
        let orderItemValues: string[] = ["0", "0", "0", "1"];
        let reviewValues: string[] = ["0", "0", "'test review'"];

        let orderItemIndex = this.orderItem.min;
        let sqlStatements: string[] = [];

        for (let i = 0; i < count; i++){
            let orderId = String(this.orders.min + i);
            orderValues[0] = orderId;
            orderValues[1] = this.random(this.customer);
            sqlStatements.push(this.insert(this.orders, orderColumns, orderValues));
            
            let itemCount = 1;
            let menuItem: string;
            let usedMenuItems: string[] = [];
            let adjuster = 0;
            do {
                orderItemValues[0] = String(orderItemIndex);
                orderItemIndex++;
                orderItemValues[1] = orderId;
                menuItem = this.random(this.menuItem, usedMenuItems);
                orderItemValues[2] = menuItem;
                adjuster += Number(menuItem)/100;
                usedMenuItems.push(menuItem);  
                orderItemValues[3] = String(Math.floor(Math.pow(Math.random(),-0.25))); 
                sqlStatements.push(this.insert(this.orderItem, orderItemColumns, orderItemValues));  
            }
             while (++itemCount < Math.pow(Math.random(), -1.25));

            reviewValues[0] = orderId;
            reviewValues[1] = (Math.random() < 0.70 + adjuster) ? "1" : "0";
            sqlStatements.push(this.insert(
                this.review, reviewColumns, reviewValues));

            sqlStatements.push(this.update(
                this.orders, "rev_id = "+String(this.review.min+i), "order_id", orderId));
        }
        return sqlStatements;
    }
}

window.onload = () => {
    let sql = new ScriptRunner().generate(100);
    let container = document.getElementById("container");
    let newHtml;
    for (let statement of sql){
        newHtml = document.createElement("p");
        newHtml.innerText = statement;
        container.appendChild(newHtml);
    }
}
