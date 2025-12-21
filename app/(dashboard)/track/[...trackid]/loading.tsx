const loading=()=>{
  return (
    <div role="status" className="h-screen w-full flex justify-center items-center bg-white/10 backdrop-blur-md">
    <div className="w-10 h-10 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
    <span className="sr-only">Loading...</span>
</div>

  );
}
export default loading
