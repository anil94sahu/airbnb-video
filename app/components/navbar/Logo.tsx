'use client'
import  Image  from 'next/image';
import {useRouter} from 'next/navigation'


const Logo = () => {
  const router = useRouter();
  return (
    <Image height="100"
    onClick={()=> router.push('/')}
    width="100"
    src="/images/logo.png"
    className='cursor-pointer'
    alt='logo' />
  )
}

export default Logo