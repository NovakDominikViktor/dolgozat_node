import {useParams, useNavigate} from 'react-router-dom';
import {useEffect, useState} from 'react';

export function InstrumentModPage() {
  const param = useParams();
  const navigate = useNavigate();
  const id = param.hangszerId;

  const [instruMent, setInstrument] = useState([]);
  const [modname, setModname] = useState("");
  const [modprice, setModprice] = useState("");
  const [modbrand, setModbrand] = useState("");
  const [modquantity, setModquantity] = useState("");
  const [modimageurl, setModimageurl] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const rest = await fetch(`https://kodbazis.hu/api/instruments/${id}`, {
          credentials: "include"
        });
        const data = await rest.json();

        setInstrument(data);
        setModname(data.name);
        setModprice(data.price);
        setModbrand(data.brand);
        setModquantity(data.quantity);
        setModimageurl(data.imageURL);
        console.log(instruMent)
      } catch (error) {
        console.log(error);
      }
    })();
  }, [id, modname, modprice, modbrand, modquantity, modimageurl, instruMent]);

  const modName = (e) => {
      setModname(e.target.value);
  }

  const modPrice = (e) => {
      setModprice(e.target.value);
  }

  const modBrand = (e) => {
      setModbrand(e.target.value);
  }

  const modQuantity = (e) => {
      setModquantity(e.target.value);
  }

  const modimageUrl = (e) => {
      setModimageurl(e.target.value);
  }

  return(
    <div className="p-5 text-center content bg-lavender">
            <h2>Hangszer módosítása</h2>

            <form onSubmit={(e) => {
                e.persist();
                e.preventDefault();
                fetch(`https://kodbazis.hu/api/instruments/${id}`, {
                    method: "PUT",
                    credentials: "include",
                    body: JSON.stringify({
                        name: e.target.elements.name.value,
                        brand: e.target.elements.brand.value,
                        price: e.target.elements.price.value,
                        quantity: e.target.elements.quantity.value,
                        imageURL: e.target.elements.imageURL.value,
                    }),
                })
                .then(() => {
                    navigate("/")
                })
                .catch(console.log)
            }}>
                <div>
                    <input type='text' id='name2' name='name' className='form-control' defaultValue={modname} onChange={modName} />
                </div>

                <div className='form-group row pb-3'>
                    <label htmlFor='brand' className='col-sm-3 col-form-label'>Márka:</label>
                </div>

                <div>
                    <input type='text' id='brand' name='brand' className='form-control' defaultValue={modbrand} onChange={modBrand} />
                </div>

                <div className='form-group row pb-3'>
                    <label htmlFor='price2' className='col-sm-3 col-form-label'>Ár:</label>
                </div>

                <div>
                    <input type='number' id='price2' name='price' className='form-control' defaultValue={modprice} onChange={modPrice} />
                </div>

                <div className='form-group row pb-3'>
                    <label htmlFor='quantity2' className='col-sm-3 col-form-label'>Darabszám:</label>
                </div>

                <div>
                    <input type='number' id='quantity2' name='quantity' className='form-control' defaultValue={modquantity} onChange={modQuantity}/>
                </div>
                <div className='form-group row pb-3'>
                    <label htmlFor='imageURL2' className='col-sm-3 col-form-label'>Kép URL:</label>
                </div>

                <div>
                    <input type='text' id='imageURL2' name='imageURL' className='form-control' defaultValue={modimageurl} onChange={modimageUrl} />
                </div>

                <button type='submit' className='btn btn-success'>Küldés</button>
            </form>
        </div>        
  )
}