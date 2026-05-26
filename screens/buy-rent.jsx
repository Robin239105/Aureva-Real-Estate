// ============== Buy & Rent pages (variants of Properties) ==============
const { PropertiesPage } = window;

function BuyPage(props)  { return <PropertiesPage {...props} mode="buy"  />; }
function RentPage(props) { return <PropertiesPage {...props} mode="rent" />; }

Object.assign(window, { BuyPage, RentPage });
