export default function SearchResults({ results }) {
  if (!results.length) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 px-6 py-4">
      {results.map((item, index) => (
        <div
          key={index}
          className="bg-white p-4 rounded shadow hover:shadow-lg"
        >
          <img
            src={
              item.thumbnail || item.image || "https://via.placeholder.com/200"
            }
            alt={item.title || item.name}
            className="h-48 w-full object-cover mb-2 rounded"
          />
          <h3 className="font-semibold text-sm">{item.title || item.name}</h3>
          <p className="text-amber-700 font-medium">
            {item.price || "Price not available"}
          </p>
          <p className="text-xs text-gray-500">
            {item.source || item.website || "Source unknown"}
          </p>
          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 text-sm underline mt-2 block"
          >
            View Product
          </a>
        </div>
      ))}
    </div>
  );
}
