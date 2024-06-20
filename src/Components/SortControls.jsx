
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import './SortControls.css';  

function SortControls({ defaultSortBy = 'created_at', defaultOrder = 'desc' }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const sort_by = searchParams.get('sort_by') || defaultSortBy;
  const order = searchParams.get('order') || defaultOrder;

  const handleSortChange = (event) => {
    const { name, value } = event.target;
    searchParams.set(name, value);
    setSearchParams(searchParams);
  };

  return (
    <div className="sort-controls">
      <label>
        Sort by:
        <select name="sort_by" value={sort_by} onChange={handleSortChange}>
          <option value="created_at">Date</option>
          <option value="comment_count">Comment Count</option>
          <option value="votes">Votes</option>
        </select>
      </label>
      <label>
        Order:
        <select name="order" value={order} onChange={handleSortChange}>
          <option value="desc">Descending</option>
          <option value="asc">Ascending</option>
        </select>
      </label>
    </div>
  );
}

export default SortControls;
