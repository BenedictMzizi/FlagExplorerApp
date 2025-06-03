<div
  style={{
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '1rem',
    padding: '1rem',
    maxHeight: '600px', // Limit height for vertical scrolling
    overflowY: 'auto',  // Enable vertical scroll
    border: '1px solid #ddd',
    borderRadius: '8px'
  }}
>
  {filteredCountries.length > 0 ? (
    filteredCountries.map((country, i) => (
      <div
        key={country.name || i}
        style={{
          border: '1px solid #ccc',
          padding: '1rem',
          borderRadius: '8px',
          textAlign: 'center'
        }}
      >
        <p style={{ fontSize: '3rem' }}>{country.flag || '🏳️'}</p>
        <p>{country.name || 'Unknown Country'}</p>
      </div>
    ))
  ) : (
    <p style={{ gridColumn: '1 / -1', textAlign: 'center', fontStyle: 'italic' }}>
      No countries match your search.
    </p>
  )}
</div>
