function App() {
  return (
    <div class="bg-gray-700 h-screen">
    <div class="flex justify-center pt-10">
      <div class="w-2/5 text-white">
        <h1 class="text-bold text-center text-4xl">Valvular Heart Disease</h1>
        <h2 class="text-medium text-center text-4xl">Detection System</h2>

        <div class="my-5">
          <div class="w-full h-[10rem]">
          </div>
        </div>

        <form method="post" action="/predict" enctype="multipart/form-data" class="flex space-x-2 text-black items-center">
          <div class="w-4/6">
            <input type="file" name="file" class="w-full bg-white rounded p-2" />
          </div>
          <div class="w-1/6">
            <select name="" id="" class="w-full bg-white rounded py-3 px-2">
              <option value="CNN">CNN</option>
              <option value="LSTM">LSTM</option>
              <option value="RNN">RNN</option>
            </select>
          </div>
          <div class="w-1/6">
            <button type="submit" class="w-full bg-blue-500 text-white rounded p-2">Submit</button>
          </div>
        </form>
      </div>
    </div>
    </div>
  );
}

export default App;
