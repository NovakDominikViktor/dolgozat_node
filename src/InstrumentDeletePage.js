import { useState, useEffect } from 'react';
import { NavLink, useNavigate,useParams } from 'react-router-dom';

export function InstrumentDeletePage() {
  const navigate = useNavigate();
  const param = useParams();
  const id = param.hangszerId;

  const [instrument, setInstrument] = useState([]);
  const [isPending, setIsPending] = useState(true); // Set initial state to true

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`https://kodbazis.hu/api/instruments/${id}`, { credentials: "include" });
        const instrument = await res.json();
        setInstrument(instrument);
      } catch (error) {
        console.log(error);
      } finally {
        setIsPending(false); // Update the state to false when the data is loaded
      }
    })();
  }, [id]);

  return (
    <div className='p-5 content bg-lavender text center'>
      {isPending || !instrument.id ? ( // Check if isPending is true or instrument.id is falsy
        <div className="spinner-border"></div>
      ) : (
        <div>
          <h2>Hangszer törlése</h2>
          <div className="card p-3">
                            <div className="card-body">
                                <h4>{instrument.brand}</h4>
                            </div>
                            
                            <h5 className="card-title">{instrument.name}</h5>
                            
                            <div className="lead">{instrument.price}.- HUF</div>
                            
                            <p>Készleten? {instrument.quantity} db</p>

                            

                                <img className="img-fluid rounded" style={{maxHeight : "500px" }} alt="hello word, ide kéne a képed" src={instrument.imageURL ? instrument.imageURL : "https://via.placeholder.com/400x800"}/>
                        
                        </div>
          <form
            onSubmit={async (e) => {
              try {
                e.preventDefault();
                setIsPending(true); // Set isPending to true before the fetch
                await fetch(`https://kodbazis.hu/api/instruments/${id}`, {
                  method: "DELETE",
                  credentials: "include"
                });
                setIsPending(false); // Set isPending to false after the fetch
                navigate("/");
              } catch (error) {
                console.log(error);
              }
            }}
          >
            <div>
              <NavLink to={`/`}>
                <button className='bi bi-backspace btn btn-warning rounded'>Mégsem</button>
              </NavLink>
              <button className='bi bi-trash3 btn btn-danger rounded'>Törlés</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
