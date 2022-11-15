import Link from "next/link";

export default function HeaderMenu(props) {
  return (
    <>
      <div className="headerMenuContainer siteContainer">
        {props.types && props.types.length > 0 ? (
          props.types.map((type) => {
            return (
              <div className="headerMenuItem" key={type._id}>
                <p className="headerMenuTitle boldFont ligthText">
                  {type.typeName}
                </p>
                <ul className="headerMenuSubItensList">
                  {props.categories && props.categories.length > 0 ? (
                    props.categories.map((categorie) => {
                      return (
                        <Link
                          key={categorie._id}
                          href={
                            "/filter-list/" + categorie._id + "/" + type._id
                          }
                        >
                          <li className="ligthText">
                            {categorie.categoryName}
                          </li>
                        </Link>
                      );
                    })
                  ) : (
                    <></>
                  )}
                </ul>
              </div>
            );
          })
        ) : (
          <></>
        )}
        <Link href={"/healthyeating"}>
          <div className="headerMenuItem">
            <p className="headerMenuTitle boldFont ligthText">
              Dicas Alimentação
            </p>
          </div>
        </Link>
        {props.cookies?.USERNAME ? (
          <Link href={"/panel"}>
            <div className="headerMenuItem">
              <p className="headerMenuTitle boldFont ligthText">
                Minhas receitas
              </p>
            </div>
          </Link>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
