"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const feature_route_1 = __importDefault(require("./routes/feature.route"));
const user_route_1 = __importDefault(require("./routes/user.route"));
const product_route_1 = __importDefault(require("./routes/product.route"));
const config_1 = __importDefault(require("./config"));
require("dotenv/config"); // To read CLERK_SECRET_KEY and CLERK_PUBLISHABLE_KEY
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
// Middleware
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// Connect to MongoDB
mongoose_1.default.connect(config_1.default.mongoURI);
app.use('/features', feature_route_1.default);
app.use('/users', user_route_1.default);
app.use('/products', product_route_1.default);
app.use((err, _req, res, _next) => {
    console.error(err.stack);
    res.status(401).send('Unauthenticated!');
});
// Start the server
app.listen(8080, () => {
    console.log(`Server running on port 8080`);
});
