export default function FooterMidListItem({ title, itemsList }) {
  return (
    <div className="w-full">
      <h3 className="font-titleFont text-white text-base font-semibold mb-3">
        {title}
      </h3>
      <ul className="flex flex-col gap-2 font-bodyFont">
        {itemsList.map((item) =>
          item.items.map((data,index) => (
            <li key={index} className="footerHover">
              {data}
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
