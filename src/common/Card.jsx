import Button from "./Button";
function Card({ title, price, category, author, stock }) {
  return (
    <>
      <div className="row mt-3">
        <div className="col-sm-12">
          <div className="card mb-3">
            <div className="row g-0">
              <div className="col-md-4">
                <img
                  src="/assets/images/bok2.png"
                  className="img-fluid rounded-start"
                  alt="book2"
                />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">{title}</h5>
                  <p className="card-text">
                    <p>Price : Rs {price}</p>
                    <p> Category : {category}</p>
                    <p>Author : {author}</p>
                    <p>Stock : {stock}</p>
                  </p>
                  <p className="card-text">
                  
                  </p>
                </div>
                <Button label="Add to Cart" type="submit" color="primary" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Card;
