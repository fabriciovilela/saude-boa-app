import Link from "next/link";

export default function Footer(){
    return(
        <>
            <div className="footer">
                <p className="ligthText">Todos os direitos reservados a "Saúde Boa Receitas" <Link href={"/termsofuse"}><b className="ligthText boldFont">Termos de uso</b></Link></p>
          </div>
        </>
    )
}