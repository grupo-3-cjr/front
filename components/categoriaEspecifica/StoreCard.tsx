import Link from "next/link";

type StoreCardProps = {
    id: number;
    logo_url: string;
    name: string;
    description: string;
}

export default function StoreCard({ id, logo_url, name, description }: StoreCardProps) {
    return (
        <Link href={`/loja/${id}`}>
            <article style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <div style={{ background: 'white', borderRadius: '9999px', width: '150px', height: '150px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                    <img 
                    src={logo_url} 
                    alt="Logo da loja" 
                    style={{ width: '96px', height: '150px', objectFit: 'contain' }} />*
                </div>

                <span style={{ color: '#ffffff', fontWeight: 200, fontSize: '1.5rem' }}>{name}</span>
                <span style={{ color: '#6A38F3' }}>{description}</span>
            </article>
        </Link>
    );
}