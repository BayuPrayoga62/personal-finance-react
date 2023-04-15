import './App.css';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      sisaUang : 0,
      persentaseUang : 0,
      pemasukanUang : 0,
      pengeluaranUang : 0,
      transaksiIN : 0,
      transaksiOUT : 0,
      summary : [
        {
          deskripsi : 'Menerima Gaji',
          tanggal : '12 april 2023',
          nominal : 1000000,
          category : 'IN'
        },
        {
          deskripsi : 'Makan nasi padang',
          tanggal : '13 april 2023',
          nominal : 20000,
          category : 'OUT'
        }
      ]
    }

    this.tambahItem = this.tambahItem.bind(this);
  }

  tambahItem(objek){
    this.setState({
      summary : [ ...this.state.summary, objek ]
    })
  }

  componentDidMount() {
    let dataUangIN = this.state.summary.filter( (item)=> item.category === 'IN' );
    let nominalUang = dataUangIN.map((item)=> item.nominal)
    let jumlahUangIn = nominalUang.reduce ((total, num)=> total + num );

    let dataUangOUT = this.state.summary.filter( (item)=> item.category === 'OUT' );
    let nominalUangOUT = dataUangOUT.map((item)=> item.nominal)
    let jumlahUangOUT = nominalUangOUT.reduce ((total, num)=> total + num );
    console.log(jumlahUangOUT)

    this.setState({
      pemasukanUang : jumlahUangIn,
      transaksiIN : nominalUang.length,
      pengeluaranUang : jumlahUangOUT,
      transaksiOUT : nominalUangOUT.length,
      sisaUang : jumlahUangIn - jumlahUangOUT,
      persentaseUang : (jumlahUangIn - jumlahUangOUT)/jumlahUangIn * 100
    })
  }

  render(){
    return (
      <>
      <div className='container py-5'>
        <div className='row'>
          <div className='col-12 text-center'>
              <h1 className='fw-bold'>CASH FLOW APPS</h1>
              <hr className='w-75 mx-auto'/>
              <h2 className='fw-bold'>Rp. {this.state.sisaUang} ,-</h2>
              <span className='title-md'>Sisa uang kamu tersisa {this.state.persentaseUang}% lagi</span>
          </div>
        </div>

        <div className='row mt-4'>
          <div className='col-6'>
            <div className='card-wraper p-4'>
            <div className='icon-wrapper mb-1'>
            <i className="bi bi-wallet2"></i>
            </div>
            <span className='title-sm'>Pemasukan</span>
            <h3 className='fw-bold'>Rp. {this.state.pemasukanUang} ,-</h3>
            <div>
            <span className='title-sm text-ungu fw-bold'>{this.state.transaksiIN}</span><span className='title-sm'> Transaksi</span>
            </div>
            </div>
          </div>

          <div className='col-6'>
            <div className='card-wraper p-4'>
            <div className='icon-wrapper mb-1'>
            <i className="bi bi-cash-stack"></i>
            </div>
            <span className='title-sm'>Pengeluaran</span>
            <h3 className='fw-bold'>Rp. {this.state.pengeluaranUang} ,-</h3>
            <div>
            <span className='title-sm text-ungu fw-bold'>{this.state.transaksiOUT}</span><span className='title-sm'> Transaksi</span>
            </div>
            </div>
          </div>
        </div>

        <div className='row mt-5'>
          <div className='col-12 d-flex justify-content-between align-items-center'>
            <h4>Ringkasan Transaksi</h4>
            <div className='wrapper-button d-flex'>
              <ModalCreate action={this.tambahItem} category="IN" variant="button btn-ungu px-3 py-2 me-3" text="Pemasukan" icon="bi bi-plus-circle-fill" modalheading="Tambahkan Pemasukan"/>
              <ModalCreate action={this.tambahItem} category="OUT" variant="button btn-pink px-3 py-2" text="Pengeluaran" icon="bi bi-dash-circle-fill" modalheading="Tambahkan Pengeluaran"/>
            </div>
          </div>
        </div>

        <div className='row mt-4'>
          { this.state.summary.map((sum, index)=> {
            return (
              <div key={index} className='mb-3 col-12 d-flex justify-content-between align-items-center'>
              <div className='d-flex align-items-center'>
              <div className={sum.category === 'IN' ? 'icon-wrapper-IN' : 'icon-wrapper-OUT'}>
              <i className={sum.category === 'IN' ? 'bi bi-wallet2' : 'bi bi-bag-dash'}></i>
              </div>
              <div className='transaction ms-3 d-flex flex-column'>
                <h6>{sum.deskripsi}</h6>
                <span className='title-sm'>{sum.tanggal}</span>
  
              </div>
            </div>
  
              <h5 className={sum.category === 'IN' ? 'text-money-in' : 'text-money-out'  }>Rp. {sum.nominal}</h5>
            </div>
            )
          }) }
         
        </div>
      </div>
      </>
    )
  }
}

class ModalCreate extends React.Component {
  constructor() {
    super();
    this.state = {
      show : false,
      deskripsi : '',
      nominal : 0,
      tanggal : '',
      category : ''
    }

    this.handleClose = this.handleClose.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.tambahItem = this.tambahItem.bind(this);
  }

  handleClose() {
    this.setState({
      show : false
    })
  }


  handleShow() {
    this.setState({
      show : true,
      category : this.props.category
    })
  }

  handleChange(evt) {
    this.setState ({
      [evt.target.name] : evt.target.value
    })
  }

  tambahItem() {
    const Data = {
      deskripsi : this.state.deskripsi,
      nominal : parseInt(this.state.nominal),
      tanggal : this.state.tanggal,
      category : this.state.category
    }
    const fnTambahItem = this.props.action;
    fnTambahItem(Data);
    this.setState({
      show : false
    })
  }

  render() {
    return (
      <>
    <button onClick={this.handleShow} className={this.props.variant}>{this.props.text} <i className={this.props.icon}></i></button>

    <Modal show={this.state.show} onHide={this.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{this.props.modalheading}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="mb-3">
          <label className="form-label">Deskripsi</label>
          <input
           type="text"
            className="form-control"
            placeholder="Masukan deskripsi"
            name='deskripsi'
            value={this.state.deskripsi}
            onChange={this.handleChange}
            />
        </div>

        <div className="mb-3">
          <label className="form-label">Nominal</label>
          <input
           type="number"
            className="form-control"
            placeholder="Masukan jumlah"
            name='nominal'
            value={this.state.nominal}
            onChange={this.handleChange}
            />
        </div>

        <div className="mb-3">
          <label className="form-label">Tanggal</label>
          <input
           type="date"
            className="form-control"
            placeholder="Masukan deskripsi"
            name='tanggal'
            value={this.state.tanggal}
            onChange={this.handleChange}
            />
        </div>

        <div>
          <input
           type="hidden"
            className="form-control"
            placeholder="Masukan deskripsi"
            name='category'
            value={this.state.category}
            onChange={this.handleChange}
            />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button className={this.props.variant} onClick={this.tambahItem}>
          Save
        </button>
      </Modal.Footer>
    </Modal>
    </>
    )
  }
}

export default App;
