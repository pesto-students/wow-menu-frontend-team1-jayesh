import MenuCard from "../components/MenuCard";

function Menu({ items }) {
  return (
    <div className="mt-4 mb-36">
      <div>
        {items.map((item) => (
          <MenuCard key={item.id} item={item} className="my-2" />
        ))}
      </div>
    </div>
  );
}

export default Menu;
