export default function SearchForm({ search, setSearch, handleSearch }) {
    return (
      <div className="container" style={{ padding: "0 !important" }}>
        <div className="col-12 mt-3" style={{ marginBottom: "30px" }}>
          <form onSubmit={handleSearch}>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                autoComplete="off"
                placeholder="Mau topup games apa?"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button className="btn btn-primary" type="submit">
                Cari
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }