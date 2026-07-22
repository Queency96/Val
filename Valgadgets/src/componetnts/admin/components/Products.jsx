import { useMemo, useState, useEffect } from 'react';
import DashboardHeader from './DashboardHeader';
import AdminSidebar from './AdminSidebar';
import AdminChat from './AdminChat';
import {
  Search,
  Plus,
  Filter,
  Package,
  Boxes,
  AlertTriangle,
  DollarSign,
  Eye,
  Pencil,
  Trash2,
  MoreVertical,
  ChevronDown,
  Download,
  MessageCircle,
  X,
  Save,
  Upload,
} from 'lucide-react';
export default function Products() {
  const [chatOpen, setChatOpen] = useState(false);
  const [products, setProducts] = useState([
    {
      id: 1,
      image: ['https://picsum.photos/100?1]', 'https://picsum.photos/100?11'],
      name: 'iPhone 16 Pro Max',
      sku: 'APL-001',
      category: 'Smartphones',
      brand: 'Apple',
      price: 2850000,
      stock: 18,
      sold: 95,
      featured: true,
      status: 'Active',
      created: '2026-06-20',
    },
    {
      id: 2,
      image: ['https://picsum.photos/100?2', 'https://picsum.photos/100?12'],
      name: 'Samsung Galaxy S25 Ultra',
      sku: 'SMS-221',
      category: 'Smartphones',
      brand: 'Samsung',
      price: 2450000,
      stock: 6,
      sold: 63,
      featured: false,
      status: 'Active',
      created: '2026-06-19',
    },
    {
      id: 3,
      image: ['https://picsum.photos/100?3', 'https://picsum.photos/100?13'],
      name: 'Sony WH-1000XM6',
      sku: 'SNY-992',
      category: 'Headphones',
      brand: 'Sony',
      price: 620000,
      stock: 0,
      sold: 45,
      featured: true,
      status: 'Out of Stock',
      created: '2026-06-15',
    },
    {
      id: 4,
      image: ['https://picsum.photos/100?4', 'https://picsum.photos/100?14'],
      name: 'MacBook Pro M5',
      sku: 'APL-550',
      category: 'Laptops',
      brand: 'Apple',
      price: 4650000,
      stock: 14,
      sold: 38,
      featured: false,
      status: 'Draft',
      created: '2026-06-14',
    },
  ]);

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  
  // Header Dashboard with dark modde
  const [notifications, setNotifications] = useState([]);
  const [openNotifications, setOpenNotifications] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchSearch =
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.sku.toLowerCase().includes(search.toLowerCase());

      const matchStatus =
        statusFilter === 'All' || product.status === statusFilter;

      return matchSearch && matchStatus;
    });
  }, [products, search, statusFilter]);

  const stats = {
    total: products.length,

    active: products.filter((p) => p.status === 'Active').length,

    outOfStock: products.filter((p) => p.stock === 0).length,

    inventoryValue: products.reduce((sum, p) => sum + p.price * p.stock, 0),
  };

  const [messages, setMessages] = useState([]);
  
  // Load Data from Local Storage
  useEffect(() => {
    const storedNotifications =
      JSON.parse(localStorage.getItem('adminNotifications')) || [];
    
    const storedChats = JSON.parse(localStorage.getItem('customerChats')) || [];

    setNotifications(storedNotifications);
    setMessages(storedChats);

  }, []);

  // Save to local storage
  useEffect(() => {
    localStorage.setItem('adminNotifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('customerChats', JSON.stringify(messages));
  }, [messages]);

  const initialForm = {
    images: [],
    name: '',
    sku: '',
    category: '',
    brand: '',
    price: '',
    stock: '',
    status: 'Active',
    featured: false,
  };
  const [formData, setFormData] = useState(initialForm);

  const openAddModal = () => {
    setFormData(initialForm);
    setImageFiles([]);
    setImagePreviews([]);
    setShowAddModal(true);
  };

  const viewProduct = (product) => {
    setSelectedProduct(product);
    setShowViewModal(true);
  };

  const editProduct = (product) => {
    setSelectedProduct(product);

    setFormData({
      ...product,
      images: product.images || [],
    });

    setImageFiles([]);

    setImagePreviews(product.images || []);

    setShowEditModal(true);
  };

  const deleteProduct = (product) => {
    setSelectedProduct(product);

    setShowDeleteModal(true);
  };

  const saveProduct = async () => {
    const form = new FormData();

    form.append('name', formData.name);
    form.append('sku', formData.sku);
    form.append('category', formData.category);
    form.append('brand', formData.brand);
    form.append('price', formData.price);
    form.append('stock', formData.stock);
    form.append('status', formData.status);
    form.append('featured', formData.featured);

    imageFiles.forEach((file) => {
      form.append('images', file);
    });

    // await axios.post(...)

    if (showEditModal) {
      setProducts((prev) =>
        prev.map((item) =>
          item.id === selectedProduct.id
            ? {
                ...item,
                ...formData,
                images: imagePreviews.length > 0 ? imagePreviews : item.images,
              }
            : item,
        ),
      );

      setShowEditModal(false);
    } else {
      setProducts((prev) => [
        {
          ...formData,
          id: Date.now(),
          sold: 0,
          created: new Date().toISOString().slice(0, 10),
          images: imagePreviews,
        },
        ...prev,
      ]);

      setShowAddModal(false);
    }

    setImageFiles([]);
    setImagePreviews([]);
    setFormData(initialForm);
  };

  const handleImages = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles(files);
    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  const confirmDelete = () => {
    setProducts((prev) =>
      prev.filter((item) => item.id !== selectedProduct.id),
    );

    setShowDeleteModal(false);

    setSelectedProduct(null);
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  const removeNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) =>
        n.id === id
          ? {
              ...n,
              read: true,
            }
          : n,
      ),
    );
  };

  return (
    <div className='min-h-screen bg-gray-100'>
      {/* {/* ===========================================
          SIDEBAR + MAIN CONTENT
      ============================================ */}

      <AdminSidebar>
        {/* ===========================================
          HEADER
      ============================================ */}

        {/* <DashboardHeader
          notifications={notifications}
          search={search}
          setSearch={setSearch}
          onOpenNotifications={() => setOpenNotifications(true)}
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
        />  */}

        {/* ===========================================
            ADMIN CHAT
        ============================================ */}
        <>
          {/* Floating Chat Button */}
          <button
            onClick={() => setChatOpen(!chatOpen)}
            className='fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-[#2F4832] hover:bg-[#243928] text-white shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110'>
            {chatOpen ? <X size={28} /> : <MessageCircle size={28} />}
          </button>

          {/* Chat Modal */}
          <AdminChat
            open={chatOpen}
            onClose={() => setChatOpen(false)}
            messages={messages}
            setMessages={setMessages}
          />
        </>


        <div className='space-y-6 p-6'>
          {/* ================= PAGE HEADER ================= */}

          <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4'>
            <div>
              <h1 className='text-3xl font-bold text-gray-900'>Products</h1>

              <p className='text-gray-500 mt-1'>
                Manage your products, inventory and pricing.
              </p>
            </div>

            <button
              onClick={openAddModal}
              className='
                h-12
                px-5
                rounded-xl
                bg-[#2F4832]
                hover:bg-[#243928]
                text-white
                font-medium
                flex
                items-center
                justify-center
                gap-2
                transition
              '>
              <Plus size={20} />
              Add Product
            </button>
          </div>

          {/* ================= STATISTICS ================= */}

          <div className='grid grid-cols-2 xl:grid-cols-4 gap-5'>
            {/* Total Products */}

            <div className='bg-white rounded-2xl border shadow-sm p-5'>
              <div className='flex justify-between items-center'>
                <div>
                  <p className='text-sm text-gray-500'>Total Products</p>

                  <h2 className='mt-2 text-3xl font-bold'>{stats.total}</h2>
                </div>

                <div className='w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center'>
                  <Package size={28} className='text-blue-600' />
                </div>
              </div>
            </div>

            {/* Active */}

            <div className='bg-white rounded-2xl border shadow-sm p-5'>
              <div className='flex justify-between items-center'>
                <div>
                  <p className='text-sm text-gray-500'>Active Products</p>

                  <h2 className='mt-2 text-3xl font-bold text-green-600'>
                    {stats.active}
                  </h2>
                </div>

                <div className='w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center'>
                  <Boxes size={28} className='text-green-600' />
                </div>
              </div>
            </div>

            {/* Out of Stock */}

            <div className='bg-white rounded-2xl border shadow-sm p-5'>
              <div className='flex justify-between items-center'>
                <div>
                  <p className='text-sm text-gray-500'>Out of Stock</p>

                  <h2 className='mt-2 text-3xl font-bold text-red-600'>
                    {stats.outOfStock}
                  </h2>
                </div>

                <div className='w-14 h-14 rounded-2xl bg-red-100 flex items-center justify-center'>
                  <AlertTriangle size={28} className='text-red-600' />
                </div>
              </div>
            </div>

            {/* Inventory Value */}

            <div className='bg-white rounded-2xl border shadow-sm p-5'>
              <div className='flex justify-between items-center'>
                <div>
                  <p className='text-sm text-gray-500'>Inventory Value</p>

                  <h2 className='mt-2 text-2xl font-bold'>
                    ₦{stats.inventoryValue.toLocaleString()}
                  </h2>
                </div>

                <div className='w-14 h-14 rounded-2xl bg-amber-100 flex items-center justify-center'>
                  <DollarSign size={28} className='text-amber-600' />
                </div>
              </div>
            </div>
          </div>
          {/* ================= SEARCH & FILTERS ================= */}

          <div className='bg-white rounded-2xl border shadow-sm p-5'>
            <div className='flex flex-col xl:flex-row gap-4 xl:items-center xl:justify-between'>
              {/* Left */}

              <div className='flex flex-1 flex-col md:flex-row gap-3'>
                {/* Search */}

                <div className='relative flex-1'>
                  <Search
                    size={18}
                    className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400'
                  />

                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder='Search product name or SKU...'
                    className='
                      w-full
                      h-12
                      border
                      rounded-xl
                      pl-11
                      pr-4
                      outline-none
                      focus:ring-2
                      focus:ring-[#2F4832]
                    '
                  />
                </div>

                {/* Status */}

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className='
                    h-12
                    rounded-xl
                    border
                    px-4
                    outline-none
                    focus:ring-2
                    focus:ring-[#2F4832]
                  '>
                  <option>All</option>
                  <option>Active</option>
                  <option>Draft</option>
                  <option>Out of Stock</option>
                </select>

                {/* Category */}

                <select
                  className='
                    h-12
                    rounded-xl
                    border
                    px-4
                    outline-none
                    focus:ring-2
                    focus:ring-[#2F4832]
                  '>
                  <option>All Categories</option>
                  <option>Smartphones</option>
                  <option>Laptops</option>
                  <option>Headphones</option>
                  <option>Accessories</option>
                </select>
              </div>

              {/* Right */}

              <div className='flex gap-3'>
                <button
                  className='
                    h-12
                    px-4
                    rounded-xl
                    border
                    hover:bg-gray-50
                    flex
                    items-center
                    gap-2
                  '>
                  <Filter size={18} />
                  More Filters
                  <ChevronDown size={16} />
                </button>

                <button
                  className='
                    h-12
                    px-4
                    rounded-xl
                    border
                    hover:bg-gray-50
                    flex
                    items-center
                    gap-2
                  '>
                  <Download size={18} />
                  Export
                </button>
              </div>
            </div>
          </div>

          {/* ================= BULK ACTION BAR ================= */}

          <div className='bg-white rounded-2xl border shadow-sm px-5 py-4'>
            <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
              <div className='flex items-center gap-4'>
                <label className='flex items-center gap-2 cursor-pointer'>
                  <input
                    type='checkbox'
                    checked={
                      selectedProducts.length === filteredProducts.length &&
                      filteredProducts.length > 0
                    }
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedProducts(filteredProducts.map((p) => p.id));
                      } else {
                        setSelectedProducts([]);
                      }
                    }}
                  />

                  <span className='text-sm text-gray-700'>Select All</span>
                </label>

                <span className='text-sm text-gray-500'>
                  {selectedProducts.length} selected
                </span>
              </div>

              <div className='flex flex-wrap gap-3'>
                <button
                  className='
                    px-4
                    py-2
                    rounded-lg
                    border
                    hover:bg-gray-50
                  '>
                  Publish
                </button>

                <button
                  className='
                    px-4
                    py-2
                    rounded-lg
                    border
                    hover:bg-gray-50
                  '>
                  Draft
                </button>

                <button
                  className='
                    px-4
                    py-2
                    rounded-lg
                    border
                    hover:bg-gray-50
                  '>
                  Feature
                </button>

                <button
                  className='
                    px-4
                    py-2
                    rounded-lg
                    bg-red-600
                    hover:bg-red-700
                    text-white
                  '>
                  Delete Selected
                </button>
              </div>
            </div>
          </div>
          {/* ================= PRODUCTS TABLE ================= */}

          <div className='bg-white rounded-2xl border shadow-sm overflow-hidden'>
            <div className='overflow-x-auto'>
              <table className='w-full'>
                {/* TABLE HEAD */}

                <thead className='bg-gray-50 border-b'>
                  <tr className='text-left'>
                    <th className='px-5 py-4 w-12'>
                      <input
                        type='checkbox'
                        checked={
                          selectedProducts.length === filteredProducts.length &&
                          filteredProducts.length > 0
                        }
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedProducts(
                              filteredProducts.map((p) => p.id),
                            );
                          } else {
                            setSelectedProducts([]);
                          }
                        }}
                      />
                    </th>

                    <th className='px-5 py-4 font-semibold text-gray-700'>
                      Product
                    </th>

                    <th className='px-5 py-4 font-semibold text-gray-700'>
                      SKU
                    </th>

                    <th className='px-5 py-4 font-semibold text-gray-700'>
                      Category
                    </th>

                    <th className='px-5 py-4 font-semibold text-gray-700'>
                      Brand
                    </th>

                    <th className='px-5 py-4 font-semibold text-gray-700'>
                      Price
                    </th>

                    <th className='px-5 py-4 font-semibold text-gray-700'>
                      Stock
                    </th>

                    <th className='px-5 py-4 font-semibold text-gray-700'>
                      Sold
                    </th>

                    <th className='px-5 py-4 font-semibold text-gray-700'>
                      Status
                    </th>

                    <th className='px-5 py-4 font-semibold text-gray-700'>
                      Featured
                    </th>

                    <th className='px-5 py-4 text-center font-semibold text-gray-700'>
                      Actions
                    </th>
                  </tr>
                </thead>

                {/* TABLE BODY */}

                <tbody>
                  {filteredProducts.map((product) => (
                    <tr
                      key={product.id}
                      className='border-b last:border-0 hover:bg-gray-50 transition'>
                      {/* Checkbox */}

                      <td className='px-5'>
                        <input
                          type='checkbox'
                          checked={selectedProducts.includes(product.id)}
                          onChange={() => {
                            if (selectedProducts.includes(product.id)) {
                              setSelectedProducts(
                                selectedProducts.filter(
                                  (id) => id !== product.id,
                                ),
                              );
                            } else {
                              setSelectedProducts([
                                ...selectedProducts,
                                product.id,
                              ]);
                            }
                          }}
                        />
                      </td>

                      {/* Product */}

                      <td className='px-5 py-4'>
                        <div className='flex items-center gap-4'>
                          <img
                            src={product.images?.[0]}
                            alt={product.name}
                            className='w-14 h-14 rounded-xl object-cover border'
                          />

                          <div>
                            <h3 className='font-semibold text-gray-900'>
                              {product.name}
                            </h3>

                            <p className='text-xs text-gray-500'>
                              Created {product.created}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* SKU */}

                      <td className='px-5'>
                        <span className='text-sm font-medium'>
                          {product.sku}
                        </span>
                      </td>

                      {/* Category */}

                      <td className='px-5'>{product.category}</td>

                      {/* Brand */}

                      <td className='px-5'>{product.brand}</td>

                      {/* Price */}

                      <td className='px-5 font-semibold'>
                        ₦{product.price.toLocaleString()}
                      </td>

                      {/* Stock */}

                      <td className='px-5'>
                        <span
                          className={`font-semibold ${
                            product.stock === 0
                              ? 'text-red-600'
                              : product.stock <= 10
                                ? 'text-orange-500'
                                : 'text-green-600'
                          }`}>
                          {product.stock}
                        </span>
                      </td>

                      {/* Sold */}

                      <td className='px-5'>{product.sold}</td>

                      {/* Status */}

                      <td className='px-5'>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold

                          ${
                            product.status === 'Active'
                              ? 'bg-green-100 text-green-700'
                              : product.status === 'Draft'
                                ? 'bg-gray-100 text-gray-700'
                                : 'bg-red-100 text-red-700'
                          }

                          `}>
                          {product.status}
                        </span>
                      </td>

                      {/* Featured */}

                      <td className='px-5'>
                        {product.featured ? (
                          <span className='px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 text-xs font-semibold'>
                            Featured
                          </span>
                        ) : (
                          <span className='text-gray-400'>—</span>
                        )}
                      </td>

                      {/* Actions */}

                      <td className='px-5'>
                        <div className='flex justify-center gap-2'>
                          <button
                            onClick={() => viewProduct(product)}
                            className='w-9 h-9 rounded-lg hover:bg-blue-50 flex items-center justify-center'>
                            <Eye size={18} className='text-blue-600' />
                          </button>

                          <button
                            onClick={() => editProduct(product)}
                            className='w-9 h-9 rounded-lg hover:bg-green-50 flex items-center justify-center'>
                            <Pencil size={18} className='text-green-600' />
                          </button>

                          <button
                            onClick={() => deleteProduct(product)}
                            className='w-9 h-9 rounded-lg hover:bg-red-50 flex items-center justify-center'>
                            <Trash2 size={18} className='text-red-600' />
                          </button>

                          <button className='w-9 h-9 rounded-lg hover:bg-gray-100 flex items-center justify-center'>
                            <MoreVertical size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {/* ================= MOBILE PRODUCT CARDS ================= */}

          <div className='lg:hidden space-y-4'>
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className='bg-white rounded-2xl border shadow-sm p-4'>
                {/* Top */}

                <div className='flex gap-4'>
                  <img
                    src={product.image}
                    alt={product.name}
                    className='w-20 h-20 rounded-xl object-cover border'
                  />

                  <div className='flex-1'>
                    <div className='flex justify-between items-start'>
                      <h3 className='font-semibold leading-tight'>
                        {product.name}
                      </h3>

                      <input
                        type='checkbox'
                        checked={selectedProducts.includes(product.id)}
                        onChange={() => {
                          if (selectedProducts.includes(product.id)) {
                            setSelectedProducts(
                              selectedProducts.filter(
                                (id) => id !== product.id,
                              ),
                            );
                          } else {
                            setSelectedProducts([
                              ...selectedProducts,
                              product.id,
                            ]);
                          }
                        }}
                      />
                    </div>

                    <p className='text-xs text-gray-500 mt-1'>
                      SKU: {product.sku}
                    </p>

                    <p className='text-xs text-gray-500'>{product.brand}</p>

                    <p className='text-lg font-bold mt-2 text-[#2F4832]'>
                      ₦{product.price.toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* Details */}

                <div className='grid grid-cols-2 gap-3 mt-5 text-sm'>
                  <div>
                    <p className='text-gray-400'>Category</p>

                    <p className='font-medium'>{product.category}</p>
                  </div>

                  <div>
                    <p className='text-gray-400'>Stock</p>

                    <p
                      className={`font-semibold ${
                        product.stock === 0
                          ? 'text-red-600'
                          : product.stock <= 10
                            ? 'text-orange-500'
                            : 'text-green-600'
                      }`}>
                      {product.stock}
                    </p>
                  </div>

                  <div>
                    <p className='text-gray-400'>Sold</p>

                    <p className='font-medium'>{product.sold}</p>
                  </div>

                  <div>
                    <p className='text-gray-400'>Status</p>

                    <span
                      className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold

                        ${
                          product.status === 'Active'
                            ? 'bg-green-100 text-green-700'
                            : product.status === 'Draft'
                              ? 'bg-gray-100 text-gray-700'
                              : 'bg-red-100 text-red-700'
                        }

                      `}>
                      {product.status}
                    </span>
                  </div>
                </div>

                {/* Featured */}

                {product.featured && (
                  <div className='mt-4'>
                    <span className='inline-flex px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 text-xs font-semibold'>
                      ⭐ Featured Product
                    </span>
                  </div>
                )}

                {/* Buttons */}

                <div className='grid grid-cols-4 gap-2 mt-5'>
                  <button className='h-10 rounded-xl border hover:bg-gray-50 flex items-center justify-center'>
                    <Eye size={18} />
                  </button>

                  <button className='h-10 rounded-xl border hover:bg-green-50 flex items-center justify-center'>
                    <Pencil size={18} className='text-green-600' />
                  </button>

                  <button className='h-10 rounded-xl border hover:bg-red-50 flex items-center justify-center'>
                    <Trash2 size={18} className='text-red-600' />
                  </button>

                  <button className='h-10 rounded-xl border hover:bg-gray-50 flex items-center justify-center'>
                    <MoreVertical size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
          {/* ================= EMPTY STATE ================= */}

          {filteredProducts.length === 0 && (
            <div className='bg-white rounded-2xl border shadow-sm py-20 px-6 text-center'>
              <Package size={70} className='mx-auto text-gray-300 mb-6' />

              <h3 className='text-2xl font-bold text-gray-700'>
                No Products Found
              </h3>

              <p className='text-gray-500 mt-2'>
                Try adjusting your search or filters.
              </p>

              <button
                onClick={() => {
                  setSearch('');
                  setStatusFilter('All');
                }}
                className='
                  mt-6
                  bg-[#2F4832]
                  hover:bg-[#243928]
                  text-white
                  px-6
                  py-3
                  rounded-xl
                  transition
                '>
                Clear Filters
              </button>
            </div>
          )}

          {/* ================= PAGINATION ================= */}

          {filteredProducts.length > 0 && (
            <div className='bg-white rounded-2xl border shadow-sm px-6 py-5'>
              <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
                {/* Left */}

                <div className='text-sm text-gray-500'>
                  Showing
                  <span className='font-semibold text-gray-800 mx-1'>1</span>-
                  <span className='font-semibold text-gray-800 mx-1'>
                    {filteredProducts.length}
                  </span>
                  of
                  <span className='font-semibold text-gray-800 mx-1'>
                    {products.length}
                  </span>
                  products
                </div>

                {/* Right */}

                <div className='flex items-center gap-2'>
                  <button
                    className='
                      h-10
                      px-4
                      rounded-lg
                      border
                      hover:bg-gray-50
                      disabled:opacity-40
                    '
                    disabled>
                    Previous
                  </button>

                  <button
                    className='
                      w-10
                      h-10
                      rounded-lg
                      bg-[#2F4832]
                      text-white
                    '>
                    1
                  </button>

                  <button
                    className='
                      w-10
                      h-10
                      rounded-lg
                      border
                      hover:bg-gray-50
                    '>
                    2
                  </button>

                  <button
                    className='
                      w-10
                      h-10
                      rounded-lg
                      border
                      hover:bg-gray-50
                    '>
                    3
                  </button>

                  <button
                    className='
                      h-10
                      px-4
                      rounded-lg
                      border
                      hover:bg-gray-50
                    '>
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ================= ADD / EDIT PRODUCT MODAL ================= */}

          {(showAddModal || showEditModal) && (
            <div className='fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4'>
              <div className='bg-white rounded-3xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden'>
                {/* Header */}
                <div className='border-b px-6 py-5 flex justify-between items-center'>
                  <div>
                    <h2 className='text-2xl font-bold'>
                      {showEditModal ? 'Edit Product' : 'Add Product'}
                    </h2>

                    <p className='text-sm text-gray-500 mt-1'>
                      Fill all product information below.
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setShowAddModal(false);
                      setShowEditModal(false);
                    }}
                    className='w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center'>
                    <X size={22} />
                  </button>
                </div>

                {/* Body */}
                <div className='overflow-y-auto max-h-[70vh] p-6'>
                  <div className='grid lg:grid-cols-2 gap-6'>
                    {/* Product Name */}
                    <div>
                      <label className='block mb-2 font-medium'>
                        Product Name
                      </label>

                      <input
                        type='text'
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            name: e.target.value,
                          })
                        }
                        className='w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#2F4832] outline-none'
                      />
                    </div>

                    {/* SKU */}
                    <div>
                      <label className='block mb-2 font-medium'>SKU</label>

                      <input
                        type='text'
                        value={formData.sku}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            sku: e.target.value,
                          })
                        }
                        className='w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#2F4832] outline-none'
                      />
                    </div>

                    {/* Category */}
                    <div>
                      <label className='block mb-2 font-medium'>Category</label>

                      <select
                        value={formData.category}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            category: e.target.value,
                          })
                        }
                        className='w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#2F4832]'>
                        <option>Smartphones</option>

                        <option>Laptops</option>

                        <option>Accessories</option>

                        <option>Gaming</option>

                        <option>Televisions</option>
                      </select>
                    </div>

                    {/* Brand */}
                    <div>
                      <label className='block mb-2 font-medium'>Brand</label>

                      <input
                        value={formData.brand}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            brand: e.target.value,
                          })
                        }
                        className='w-full border rounded-xl px-4 py-3'
                      />
                    </div>

                    {/* Price */}
                    <div>
                      <label className='block mb-2 font-medium'>
                        Price (₦)
                      </label>

                      <input
                        type='number'
                        value={formData.price}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            price: Number(e.target.value),
                          })
                        }
                        className='w-full border rounded-xl px-4 py-3'
                      />
                    </div>

                    {/* Stock */}
                    <div>
                      <label className='block mb-2 font-medium'>Stock</label>

                      <input
                        type='number'
                        value={formData.stock}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            stock: Number(e.target.value),
                          })
                        }
                        className='w-full border rounded-xl px-4 py-3'
                      />
                    </div>

                    {/* Product Image */}

                    <div className='lg:col-span-2'>
                      <label className='block mb-2 font-medium'>
                        Product Image URL
                      </label>

                      <div className='flex gap-3'>
                        <input
                          // type="text"
                          // value={formData.image}
                          // onChange={(e) =>
                          //   setFormData({
                          //     ...formData,
                          //     image: e.target.value,
                          //   })
                          // }
                          type='file'
                          multiple
                          accept='image/*'
                          onChange={handleImages}
                          placeholder='Upload product image(s)...'
                          className='flex-1 border rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#2F4832] outline-none'
                        />

                        <button
                          type='button'
                          className='px-5 rounded-xl border hover:bg-gray-50 flex items-center gap-2'>
                          <Upload size={18} />
                          Upload
                        </button>
                      </div>

                      {formData.image && (
                        <div className='mt-5'>
                          <img
                            src={formData.image}
                            alt='Preview'
                            className='w-40 h-40 object-cover rounded-2xl border'
                          />
                        </div>
                      )}

                      <div className='grid grid-cols-4 gap-4 mt-5'>
                        {imagePreviews.map((image, index) => (
                          <div key={index} className='relative group'>
                            <img
                              src={image}
                              className='w-full h-28 object-cover rounded-xl border'
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Description */}
                    <div className='lg:col-span-2'>
                      <label className='block mb-2 font-medium'>
                        Product Description
                      </label>

                      <textarea
                        rows={5}
                        placeholder='Write product description...'
                        className='w-full border rounded-xl px-4 py-3 resize-none focus:ring-2 focus:ring-[#2F4832] outline-none'
                      />
                    </div>

                    {/* Status */}
                    <div>
                      <label className='block mb-2 font-medium'>
                        Product Status
                      </label>

                      <select
                        value={formData.status}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            status: e.target.value,
                          })
                        }
                        className='w-full border rounded-xl px-4 py-3'>
                        <option value='Active'>Active</option>

                        <option value='Draft'>Draft</option>

                        <option value='Out of Stock'>Out of Stock</option>
                      </select>
                    </div>

                    {/* Featured */}
                    <div className='flex items-center justify-between border rounded-xl px-5 py-4'>
                      <div>
                        <h3 className='font-semibold'>Featured Product</h3>

                        <p className='text-sm text-gray-500'>
                          Display this product on homepage
                        </p>
                      </div>

                      <label className='relative inline-flex cursor-pointer'>
                        <input
                          type='checkbox'
                          checked={formData.featured}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              featured: e.target.checked,
                            })
                          }
                          className='sr-only peer'
                        />

                        <div
                          className='
                            w-12
                            h-7
                            bg-gray-300
                            rounded-full
                            peer
                            peer-checked:bg-[#2F4832]
                            after:absolute
                            after:top-1
                            after:left-1
                            after:w-5
                            after:h-5
                            after:bg-white
                            after:rounded-full
                            after:transition-all
                            peer-checked:after:translate-x-5
                          '></div>
                      </label>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className='border-t bg-gray-50 px-6 py-5 flex justify-end gap-4'>
                    <button
                      onClick={() => {
                        setShowAddModal(false);
                        setShowEditModal(false);
                      }}
                      className='px-6 py-3 rounded-xl border hover:bg-white'>
                      Cancel
                    </button>

                    <button
                      onClick={saveProduct}
                      className='px-6 py-3 rounded-xl bg-[#2F4832] hover:bg-[#243928] text-white flex items-center gap-2'>
                      <Save size={18} />

                      {showEditModal ? 'Update Product' : 'Save Product'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ================= VIEW PRODUCT MODAL ================= */}

          {showViewModal && selectedProduct && (
            <div className='fixed inset-0 z-[70] bg-black/50 flex items-center justify-center p-4'>
              <div className='bg-white rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden'>
                {/* Header */}

                <div className='flex items-center justify-between px-6 py-5 border-b'>
                  <h2 className='text-2xl font-bold'>Product Details</h2>

                  <button
                    onClick={() => setShowViewModal(false)}
                    className='w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center'>
                    <X size={22} />
                  </button>
                </div>

                {/* Body */}

                <div className='p-6'>
                  <div className='flex flex-col md:flex-row gap-8'>
                    {/* Image */}

                    <img
                      src={selectedProduct.image}
                      alt={selectedProduct.name}
                      className='w-full md:w-64 h-64 object-cover rounded-2xl border'
                    />

                    {/* Details */}

                    <div className='flex-1 space-y-4'>
                      <div>
                        <p className='text-gray-500 text-sm'>Product Name</p>

                        <h3 className='text-xl font-bold'>
                          {selectedProduct.name}
                        </h3>
                      </div>

                      <div className='grid grid-cols-2 gap-4'>
                        <div>
                          <p className='text-gray-500 text-sm'>SKU</p>

                          <p className='font-semibold'>{selectedProduct.sku}</p>
                        </div>

                        <div>
                          <p className='text-gray-500 text-sm'>Brand</p>

                          <p className='font-semibold'>
                            {selectedProduct.brand}
                          </p>
                        </div>

                        <div>
                          <p className='text-gray-500 text-sm'>Category</p>

                          <p>{selectedProduct.category}</p>
                        </div>

                        <div>
                          <p className='text-gray-500 text-sm'>Price</p>

                          <p className='font-bold text-[#2F4832]'>
                            ₦{selectedProduct.price.toLocaleString()}
                          </p>
                        </div>

                        <div>
                          <p className='text-gray-500 text-sm'>Stock</p>

                          <p>{selectedProduct.stock}</p>
                        </div>

                        <div>
                          <p className='text-gray-500 text-sm'>Sold</p>

                          <p>{selectedProduct.sold}</p>
                        </div>
                      </div>

                      <div>
                        <span
                          className={`px-4 py-2 rounded-full text-sm font-semibold

                          ${
                            selectedProduct.status === 'Active'
                              ? 'bg-green-100 text-green-700'
                              : selectedProduct.status === 'Draft'
                                ? 'bg-gray-100 text-gray-700'
                                : 'bg-red-100 text-red-700'
                          }

                          `}>
                          {selectedProduct.status}
                        </span>
                      </div>

                      {selectedProduct.featured && (
                        <span className='inline-flex bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full text-sm'>
                          ⭐ Featured Product
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Footer */}

                <div className='border-t bg-gray-50 px-6 py-4 flex justify-end'>
                  <button
                    onClick={() => setShowViewModal(false)}
                    className='px-6 py-3 rounded-xl bg-[#2F4832] text-white hover:bg-[#243928]'>
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ================= DELETE MODAL ================= */}

          {showDeleteModal && selectedProduct && (
            <div className='fixed inset-0 z-[80] bg-black/50 flex items-center justify-center p-4'>
              <div className='bg-white rounded-3xl max-w-md w-full shadow-2xl overflow-hidden'>
                <div className='p-8 text-center'>
                  <div className='w-20 h-20 mx-auto rounded-full bg-red-100 flex items-center justify-center'>
                    <Trash2 size={38} className='text-red-600' />
                  </div>

                  <h2 className='text-2xl font-bold mt-6'>Delete Product?</h2>

                  <p className='text-gray-500 mt-3'>
                    You're about to permanently delete
                    <span className='font-semibold'>
                      {' '}
                      {selectedProduct.name}
                    </span>
                    .
                    <br />
                    This action cannot be undone.
                  </p>
                </div>

                <div className='border-t px-6 py-5 flex gap-3'>
                  <button
                    onClick={() => setShowDeleteModal(false)}
                    className='flex-1 py-3 rounded-xl border hover:bg-gray-50'>
                    Cancel
                  </button>

                  <button
                    onClick={confirmDelete}
                    className='flex-1 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white'>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </AdminSidebar>
    </div>
  );
}
