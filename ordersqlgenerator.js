/* Order SQL Generator

Quickly generates an SQL script which creates a large number
of mock orders in the database when run.

It is useful for demonstrating how rating the items creates a
review score, since this is a statistic rather than something
inherent in the data itself.
*/
var SQLType = /** @class */ (function () {
    function SQLType(name, min, max) {
        this.name = name;
        this.min = min;
        this.max = max;
    }
    return SQLType;
}());
var ScriptRunner = /** @class */ (function () {
    function ScriptRunner() {
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
        this.customer = new SQLType('cust_t', 1, 1);
        // min and max must be valid customers (chosen randomly)
    }
    ScriptRunner.prototype.insert = function (table, columns, values) {
        var ret = "INSERT INTO " + table.name + "\n            (";
        for (var i in columns) {
            ret += (Number(i) == 0) ? columns[i] : ", " + columns[i];
        }
        ret += ") \n    VALUES (";
        for (var i in values) {
            ret += (Number(i) == 0) ? values[i] : ", " + values[i];
        }
        ret += ");";
        return ret;
    };
    ScriptRunner.prototype.update = function (table, set, whereField, whereCondition) {
        return "UPDATE " + table.name + "\n            SET " + set + "\n            WHERE " + whereField + " = " + whereCondition + ";";
    };
    ScriptRunner.prototype.random = function (type, removed) {
        var max = type.max;
        var min = type.min;
        if (removed == undefined || removed.length == 0)
            return String(Math.floor(Math.random() * (max - min + 1)) + min);
        if (removed.length >= max - min)
            return null;
        var vals = [];
        for (var i = 0; i <= max - min; i++) {
            vals.push(String(min + i));
        }
        removed.forEach(function (item) {
            var x = vals.indexOf(item);
            if (x != -1)
                vals.splice(x, 1);
        });
        return vals[Math.floor(Math.random() * (vals.length))];
    };
    ScriptRunner.prototype.generate = function (count) {
        var orderColumns = ["order_id", "cust_id",
            "rev_id", "price", "status", "address_id",
            "submitted_time", "last_action"];
        var orderItemColumns = ["item_id", "order_id",
            "menu_item", "quantity"];
        var reviewColumns = ["review_id", "good_rating",
            "comments"];
        var orderValues = ["0", "0", "NULL", "0", "'COMPLETED'",
            "NULL", "CURRENT_TIMESTAMP", "CURRENT_TIMESTAMP"];
        var orderItemValues = ["0", "0", "0", "1"];
        var reviewValues = ["0", "0", "'test review'"];
        var orderItemIndex = this.orderItem.min;
        var sqlStatements = [];
        for (var i = 0; i < count; i++) {
            var orderId = String(this.orders.min + i);
            orderValues[0] = orderId;
            orderValues[1] = this.random(this.customer);
            sqlStatements.push(this.insert(this.orders, orderColumns, orderValues));
            var itemCount = 1;
            var menuItem = void 0;
            var usedMenuItems = [];
            var adjuster = 0;
            do {
                orderItemValues[0] = String(orderItemIndex);
                orderItemIndex++;
                orderItemValues[1] = orderId;
                menuItem = this.random(this.menuItem, usedMenuItems);
                orderItemValues[2] = menuItem;
                adjuster += Number(menuItem) / 100;
                usedMenuItems.push(menuItem);
                orderItemValues[3] = String(Math.floor(Math.pow(Math.random(), -0.25)));
                sqlStatements.push(this.insert(this.orderItem, orderItemColumns, orderItemValues));
            } while (++itemCount < Math.pow(Math.random(), -1.25));
            reviewValues[0] = orderId;
            reviewValues[1] = (Math.random() < 0.80 + adjuster) ? "1" : "0";
            sqlStatements.push(this.insert(this.review, reviewColumns, reviewValues));
            sqlStatements.push(this.update(this.orders, "rev_id = " + String(this.review.min + i), "order_id", orderId));
        }
        return sqlStatements;
    };
    return ScriptRunner;
}());
window.onload = function () {
    var sql = new ScriptRunner().generate(100);
    var container = document.getElementById("container");
    var newHtml;
    for (var _i = 0, sql_1 = sql; _i < sql_1.length; _i++) {
        var statement = sql_1[_i];
        newHtml = document.createElement("p");
        newHtml.innerText = statement;
        container.appendChild(newHtml);
    }
};
