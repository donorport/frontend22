export default function Profile(props) {
  let stateData = props.stateData;
  return (
    <>
      <div className="padding b-b">
        <div className="row-col">
          {/* <div className="col-sm w w-auto-xs m-b">
                        <div className="item w rounded">
                            <div className="item-media">
                                <div className="item-media-content" style={{backgroundImage: "url('images/a3.jpg')"}}></div>
                            </div>
                        </div>
                    </div> */}
          <div className="col-sm">
            <div className="p-l-md no-padding-xs">
              <h1 className="page-title">
                <span className="h1 _800" style={{ textTransform: 'capitalize' }}>
                  {stateData.name}
                </span>
              </h1>
              <p
                className="item-desc text-ellipsis text-muted"
                data-ui-toggle-className="text-ellipsis"
              >
                {stateData.rolename ? stateData.rolename.toUpperCase() : ''}
              </p>
              {/* <div className="item-action m-b">
                                <a href="#" className="btn btn-sm rounded primary">Upload</a>
                                <a href="#" className="btn btn-sm rounded white">Edit Profile</a>
                            </div> */}
              <div className="block clearfix m-b">
                {/* <span>9</span> <span className="text-muted">Albums</span>, <span>23</span> <span className="text-muted">Tracks</span> */}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row-col">
        <div className="col-lg-9 b-r no-border-md">
          <div className="padding p-y-0 m-b-md">
            <div className="nav-active-border b-primary bottom m-b-md m-t">
              <ul className="nav l-h-2x" data-ui-jp="taburl">
                {/* <li className="nav-item m-r inline">
                                    <a className="nav-link active" href="#" data-toggle="tab" data-target="#track">Tracks</a>
                                </li>
                                <li className="nav-item m-r inline">
                                    <a className="nav-link" href="#" data-toggle="tab" data-target="#playlist">Playlists</a>
                                </li> */}
                <li className="nav-item m-r inline ">
                  <a className="nav-link active" href="#" data-toggle="tab" data-target="#profile">
                    Profile
                  </a>
                </li>
                <li className="nav-item m-r inline">
                  <a className="nav-link" href="#" data-toggle="tab" data-target="#like">
                    Change Password
                  </a>
                </li>
              </ul>
            </div>
            <div className="tab-content">
              {/* <div className="tab-pane active" id="track">
                                <div className="row item-list item-list-by m-b">
                                    <div className="col-xs-12">
                                        <div className="item r" data-id="item-10" data-src="http://api.soundcloud.com/tracks/237514750/stream?client_id=a10d44d431ad52868f1bce6d36f5234c">
                                            <div className="item-media ">
                                                <a href="track.detail.html" className="item-media-content" style={{backgroundImage: "url('images/b9.jpg')"}}></a>
                                                <div className="item-overlay center">
                                                    <button className="btn-playpause">Play</button>
                                                </div>
                                            </div>
                                            <div className="item-info">
                                                <div className="item-overlay bottom text-right">
                                                    <a href="#" className="btn-favorite"><i className="fa fa-heart-o"></i></a>
                                                    <a href="#" className="btn-more" data-toggle="dropdown"><i className="fa fa-ellipsis-h"></i></a>
                                                    <div className="dropdown-menu pull-right black lt"></div>
                                                </div>
                                                <div className="item-title text-ellipsis">
                                                    <a href="track.detail.html">The Open Road</a>
                                                </div>
                                                <div className="item-author text-sm text-ellipsis hide">
                                                    <a href="artist.detail.html" className="text-muted">Postiljonen</a>
                                                </div>
                                                <div className="item-meta text-sm text-muted">
                                                    <span className="item-meta-category"><a href="browse.html" className="label">Soul</a></span>
                                                    <span className="item-meta-date text-xs">02.04.2016</span>
                                                </div>

                                                <div className="item-except visible-list text-sm text-muted h-2x m-t-sm">
                                                    Litatem tantae pecuniae? Utram tandem linguam nescio? Sed hoc sane concedamus.
                                                </div>

                                                <div className="item-action visible-list m-t-sm">
                                                    <a href="#" className="btn btn-xs white">Edit</a>
                                                    <a href="#" className="btn btn-xs white" data-toggle="modal" data-target="#delete-modal">Delete</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xs-12">
                                        <div className="item r" data-id="item-9" data-src="http://api.soundcloud.com/tracks/264094434/stream?client_id=a10d44d431ad52868f1bce6d36f5234c">
                                            <div className="item-media ">
                                                <a href="track.detail.html" className="item-media-content" style={{backgroundImage: "url('images/b8.jpg')"}}></a>
                                                <div className="item-overlay center">
                                                    <button className="btn-playpause">Play</button>
                                                </div>
                                            </div>
                                            <div className="item-info">
                                                <div className="item-overlay bottom text-right">
                                                    <a href="#" className="btn-favorite"><i className="fa fa-heart-o"></i></a>
                                                    <a href="#" className="btn-more" data-toggle="dropdown"><i className="fa fa-ellipsis-h"></i></a>
                                                    <div className="dropdown-menu pull-right black lt"></div>
                                                </div>
                                                <div className="item-title text-ellipsis">
                                                    <a href="track.detail.html">All I Need</a>
                                                </div>
                                                <div className="item-author text-sm text-ellipsis hide">
                                                    <a href="artist.detail.html" className="text-muted">Pablo Nouvelle</a>
                                                </div>
                                                <div className="item-meta text-sm text-muted">
                                                    <span className="item-meta-category"><a href="browse.html" className="label">Jazz</a></span>
                                                    <span className="item-meta-date text-xs">02.04.2016</span>
                                                </div>

                                                <div className="item-except visible-list text-sm text-muted h-2x m-t-sm">
                                                    Tandem linguam nescio? Sed hoc sane concedamus.
                                                </div>

                                                <div className="item-action visible-list m-t-sm">
                                                    <a href="#" className="btn btn-xs white">Edit</a>
                                                    <a href="#" className="btn btn-xs white" data-toggle="modal" data-target="#delete-modal">Delete</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xs-12">
                                        <div className="item r" data-id="item-4" data-src="http://api.soundcloud.com/tracks/230791292/stream?client_id=a10d44d431ad52868f1bce6d36f5234c">
                                            <div className="item-media ">
                                                <a href="track.detail.html" className="item-media-content" style={{backgroundImage: "url('images/b3.jpg')"}}></a>
                                                <div className="item-overlay center">
                                                    <button className="btn-playpause">Play</button>
                                                </div>
                                            </div>
                                            <div className="item-info">
                                                <div className="item-overlay bottom text-right">
                                                    <a href="#" className="btn-favorite"><i className="fa fa-heart-o"></i></a>
                                                    <a href="#" className="btn-more" data-toggle="dropdown"><i className="fa fa-ellipsis-h"></i></a>
                                                    <div className="dropdown-menu pull-right black lt"></div>
                                                </div>
                                                <div className="item-title text-ellipsis">
                                                    <a href="track.detail.html">What A Time To Be Alive</a>
                                                </div>
                                                <div className="item-author text-sm text-ellipsis hide">
                                                    <a href="artist.detail.html" className="text-muted">Judith Garcia</a>
                                                </div>
                                                <div className="item-meta text-sm text-muted">
                                                    <span className="item-meta-category"><a href="browse.html" className="label">Electro</a></span>
                                                    <span className="item-meta-date text-xs">04.05.2016</span>
                                                </div>

                                                <div className="item-except visible-list text-sm text-muted h-2x m-t-sm">
                                                    Verum hoc idem saepe faciamus inguam nescio? Sed hoc sane concedamus.
                                                </div>

                                                <div className="item-action visible-list m-t-sm">
                                                    <a href="#" className="btn btn-xs white">Edit</a>
                                                    <a href="#" className="btn btn-xs white" data-toggle="modal" data-target="#delete-modal">Delete</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xs-12">
                                        <div className="item r" data-id="item-2" data-src="http://api.soundcloud.com/tracks/259445397/stream?client_id=a10d44d431ad52868f1bce6d36f5234c">
                                            <div className="item-media ">
                                                <a href="track.detail.html" className="item-media-content" style={{backgroundImage: "url('images/b1.jpg')"}}></a>
                                                <div className="item-overlay center">
                                                    <button className="btn-playpause">Play</button>
                                                </div>
                                            </div>
                                            <div className="item-info">
                                                <div className="item-overlay bottom text-right">
                                                    <a href="#" className="btn-favorite"><i className="fa fa-heart-o"></i></a>
                                                    <a href="#" className="btn-more" data-toggle="dropdown"><i className="fa fa-ellipsis-h"></i></a>
                                                    <div className="dropdown-menu pull-right black lt"></div>
                                                </div>
                                                <div className="item-title text-ellipsis">
                                                    <a href="track.detail.html">Fireworks</a>
                                                </div>
                                                <div className="item-author text-sm text-ellipsis hide">
                                                    <a href="artist.detail.html" className="text-muted">Kygo</a>
                                                </div>
                                                <div className="item-meta text-sm text-muted">
                                                    <span className="item-meta-category"><a href="browse.html" className="label">Jazz</a></span>
                                                    <span className="item-meta-date text-xs">02.05.2016</span>
                                                </div>

                                                <div className="item-except visible-list text-sm text-muted h-2x m-t-sm">
                                                    Hidem saepe faciamus. Quid ad utilitatem tantae pecuniae? Utram tandem linguam nescio? Sed hoc sane concedamus.
                                                </div>

                                                <div className="item-action visible-list m-t-sm">
                                                    <a href="#" className="btn btn-xs white">Edit</a>
                                                    <a href="#" className="btn btn-xs white" data-toggle="modal" data-target="#delete-modal">Delete</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xs-12">
                                        <div className="item r" data-id="item-12" data-src="http://api.soundcloud.com/tracks/174495152/stream?client_id=a10d44d431ad52868f1bce6d36f5234c">
                                            <div className="item-media ">
                                                <a href="track.detail.html" className="item-media-content" style={{backgroundImage: "url('images/b11.jpg')"}}></a>
                                                <div className="item-overlay center">
                                                    <button className="btn-playpause">Play</button>
                                                </div>
                                            </div>
                                            <div className="item-info">
                                                <div className="item-overlay bottom text-right">
                                                    <a href="#" className="btn-favorite"><i className="fa fa-heart-o"></i></a>
                                                    <a href="#" className="btn-more" data-toggle="dropdown"><i className="fa fa-ellipsis-h"></i></a>
                                                    <div className="dropdown-menu pull-right black lt"></div>
                                                </div>
                                                <div className="item-title text-ellipsis">
                                                    <a href="track.detail.html">Happy ending</a>
                                                </div>
                                                <div className="item-author text-sm text-ellipsis hide">
                                                    <a href="artist.detail.html" className="text-muted">Postiljonen</a>
                                                </div>
                                                <div className="item-meta text-sm text-muted">
                                                    <span className="item-meta-category"><a href="browse.html" className="label">Latin</a></span>
                                                    <span className="item-meta-date text-xs">09.06.2016</span>
                                                </div>

                                                <div className="item-except visible-list text-sm text-muted h-2x m-t-sm">
                                                    Utilitatem tantae pecuniae? Utram tandem linguam nescio? Sed hoc sane concedamus.
                                                </div>

                                                <div className="item-action visible-list m-t-sm">
                                                    <a href="#" className="btn btn-xs white">Edit</a>
                                                    <a href="#" className="btn btn-xs white" data-toggle="modal" data-target="#delete-modal">Delete</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xs-12">
                                        <div className="item r" data-id="item-6" data-src="http://api.soundcloud.com/tracks/236107824/stream?client_id=a10d44d431ad52868f1bce6d36f5234c">
                                            <div className="item-media ">
                                                <a href="track.detail.html" className="item-media-content" style={{backgroundImage: "url('images/b5.jpg')"}}></a>
                                                <div className="item-overlay center">
                                                    <button className="btn-playpause">Play</button>
                                                </div>
                                            </div>
                                            <div className="item-info">
                                                <div className="item-overlay bottom text-right">
                                                    <a href="#" className="btn-favorite"><i className="fa fa-heart-o"></i></a>
                                                    <a href="#" className="btn-more" data-toggle="dropdown"><i className="fa fa-ellipsis-h"></i></a>
                                                    <div className="dropdown-menu pull-right black lt"></div>
                                                </div>
                                                <div className="item-title text-ellipsis">
                                                    <a href="track.detail.html">Body on me</a>
                                                </div>
                                                <div className="item-author text-sm text-ellipsis hide">
                                                    <a href="artist.detail.html" className="text-muted">Rita Ora</a>
                                                </div>
                                                <div className="item-meta text-sm text-muted">
                                                    <span className="item-meta-category"><a href="browse.html" className="label">Nature</a></span>
                                                    <span className="item-meta-date text-xs">09.04.2016</span>
                                                </div>

                                                <div className="item-except visible-list text-sm text-muted h-2x m-t-sm">
                                                    Tantae pecuniae? Utram tandem linguam nescio? Sed hoc sane concedamus.
                                                </div>

                                                <div className="item-action visible-list m-t-sm">
                                                    <a href="#" className="btn btn-xs white">Edit</a>
                                                    <a href="#" className="btn btn-xs white" data-toggle="modal" data-target="#delete-modal">Delete</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xs-12">
                                        <div className="item r" data-id="item-11" data-src="http://api.soundcloud.com/tracks/218060449/stream?client_id=a10d44d431ad52868f1bce6d36f5234c">
                                            <div className="item-media ">
                                                <a href="track.detail.html" className="item-media-content" style={{backgroundImage: "url('images/b10.jpg')"}}></a>
                                                <div className="item-overlay center">
                                                    <button className="btn-playpause">Play</button>
                                                </div>
                                            </div>
                                            <div className="item-info">
                                                <div className="item-overlay bottom text-right">
                                                    <a href="#" className="btn-favorite"><i className="fa fa-heart-o"></i></a>
                                                    <a href="#" className="btn-more" data-toggle="dropdown"><i className="fa fa-ellipsis-h"></i></a>
                                                    <div className="dropdown-menu pull-right black lt"></div>
                                                </div>
                                                <div className="item-title text-ellipsis">
                                                    <a href="track.detail.html">Spring</a>
                                                </div>
                                                <div className="item-author text-sm text-ellipsis hide">
                                                    <a href="artist.detail.html" className="text-muted">Pablo Nouvelle</a>
                                                </div>
                                                <div className="item-meta text-sm text-muted">
                                                    <span className="item-meta-category"><a href="browse.html" className="label">Indie</a></span>
                                                    <span className="item-meta-date text-xs">09.03.2016</span>
                                                </div>

                                                <div className="item-except visible-list text-sm text-muted h-2x m-t-sm">
                                                    Saepe faciamus. Quid ad utilitatem tantae pecuniae? Utram tandem linguam nescio? Sed hoc sane concedamus.
                                                </div>

                                                <div className="item-action visible-list m-t-sm">
                                                    <a href="#" className="btn btn-xs white">Edit</a>
                                                    <a href="#" className="btn btn-xs white" data-toggle="modal" data-target="#delete-modal">Delete</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xs-12">
                                        <div className="item r" data-id="item-3" data-src="http://api.soundcloud.com/tracks/79031167/stream?client_id=a10d44d431ad52868f1bce6d36f5234c">
                                            <div className="item-media ">
                                                <a href="track.detail.html" className="item-media-content" style={{backgroundImage: "url('images/b2.jpg')"}}></a>
                                                <div className="item-overlay center">
                                                    <button className="btn-playpause">Play</button>
                                                </div>
                                            </div>
                                            <div className="item-info">
                                                <div className="item-overlay bottom text-right">
                                                    <a href="#" className="btn-favorite"><i className="fa fa-heart-o"></i></a>
                                                    <a href="#" className="btn-more" data-toggle="dropdown"><i className="fa fa-ellipsis-h"></i></a>
                                                    <div className="dropdown-menu pull-right black lt"></div>
                                                </div>
                                                <div className="item-title text-ellipsis">
                                                    <a href="track.detail.html">I Wanna Be In the Cavalry</a>
                                                </div>
                                                <div className="item-author text-sm text-ellipsis hide">
                                                    <a href="artist.detail.html" className="text-muted">Jeremy Scott</a>
                                                </div>
                                                <div className="item-meta text-sm text-muted">
                                                    <span className="item-meta-category"><a href="browse.html" className="label">DJ</a></span>
                                                    <span className="item-meta-date text-xs">09.04.2016</span>
                                                </div>

                                                <div className="item-except visible-list text-sm text-muted h-2x m-t-sm">
                                                    Tantae pecuniae? Utram tandem linguam nescio? Sed hoc sane concedamus.
                                                </div>

                                                <div className="item-action visible-list m-t-sm">
                                                    <a href="#" className="btn btn-xs white">Edit</a>
                                                    <a href="#" className="btn btn-xs white" data-toggle="modal" data-target="#delete-modal">Delete</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xs-12">
                                        <div className="item r" data-id="item-5" data-src="http://streaming.radionomy.com/JamendoLounge">
                                            <div className="item-media ">
                                                <a href="track.detail.html" className="item-media-content" style={{backgroundImage: "url('images/b4.jpg')"}}></a>
                                                <div className="item-overlay center">
                                                    <button className="btn-playpause">Play</button>
                                                </div>
                                            </div>
                                            <div className="item-info">
                                                <div className="item-overlay bottom text-right">
                                                    <a href="#" className="btn-favorite"><i className="fa fa-heart-o"></i></a>
                                                    <a href="#" className="btn-more" data-toggle="dropdown"><i className="fa fa-ellipsis-h"></i></a>
                                                    <div className="dropdown-menu pull-right black lt"></div>
                                                </div>
                                                <div className="item-title text-ellipsis">
                                                    <a href="track.detail.html">Live Radio</a>
                                                </div>
                                                <div className="item-author text-sm text-ellipsis hide">
                                                    <a href="artist.detail.html" className="text-muted">Radionomy</a>
                                                </div>
                                                <div className="item-meta text-sm text-muted">
                                                    <span className="item-meta-category"><a href="browse.html" className="label">Electro</a></span>
                                                    <span className="item-meta-date text-xs">09.05.2016</span>
                                                </div>

                                                <div className="item-except visible-list text-sm text-muted h-2x m-t-sm">
                                                    Verum hoc idem saepe faciamus. Quid ad utilitatem tantae pecuniae? Utram tandem linguam nescio? Sed hoc sane concedamus.
                                                </div>

                                                <div className="item-action visible-list m-t-sm">
                                                    <a href="#" className="btn btn-xs white">Edit</a>
                                                    <a href="#" className="btn btn-xs white" data-toggle="modal" data-target="#delete-modal">Delete</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xs-12">
                                        <div className="item r" data-id="item-8" data-src="http://api.soundcloud.com/tracks/236288744/stream?client_id=a10d44d431ad52868f1bce6d36f5234c">
                                            <div className="item-media ">
                                                <a href="track.detail.html" className="item-media-content" style={{backgroundImage: "url('images/b7.jpg')"}}></a>
                                                <div className="item-overlay center">
                                                    <button className="btn-playpause">Play</button>
                                                </div>
                                            </div>
                                            <div className="item-info">
                                                <div className="item-overlay bottom text-right">
                                                    <a href="#" className="btn-favorite"><i className="fa fa-heart-o"></i></a>
                                                    <a href="#" className="btn-more" data-toggle="dropdown"><i className="fa fa-ellipsis-h"></i></a>
                                                    <div className="dropdown-menu pull-right black lt"></div>
                                                </div>
                                                <div className="item-title text-ellipsis">
                                                    <a href="track.detail.html">Simple Place To Be</a>
                                                </div>
                                                <div className="item-author text-sm text-ellipsis hide">
                                                    <a href="artist.detail.html" className="text-muted">RYD</a>
                                                </div>
                                                <div className="item-meta text-sm text-muted">
                                                    <span className="item-meta-category"><a href="browse.html" className="label">Radio</a></span>
                                                    <span className="item-meta-date text-xs">09.04.2016</span>
                                                </div>

                                                <div className="item-except visible-list text-sm text-muted h-2x m-t-sm">
                                                    Ad utilitatem tantae pecuniae? Utram tandem linguam nescio? Sed hoc sane concedamus.
                                                </div>

                                                <div className="item-action visible-list m-t-sm">
                                                    <a href="#" className="btn btn-xs white">Edit</a>
                                                    <a href="#" className="btn btn-xs white" data-toggle="modal" data-target="#delete-modal">Delete</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xs-12">
                                        <div className="item r" data-id="item-7" data-src="http://api.soundcloud.com/tracks/245566366/stream?client_id=a10d44d431ad52868f1bce6d36f5234c">
                                            <div className="item-media ">
                                                <a href="track.detail.html" className="item-media-content" style={{backgroundImage: "url('images/b6.jpg')"}}></a>
                                                <div className="item-overlay center">
                                                    <button className="btn-playpause">Play</button>
                                                </div>
                                            </div>
                                            <div className="item-info">
                                                <div className="item-overlay bottom text-right">
                                                    <a href="#" className="btn-favorite"><i className="fa fa-heart-o"></i></a>
                                                    <a href="#" className="btn-more" data-toggle="dropdown"><i className="fa fa-ellipsis-h"></i></a>
                                                    <div className="dropdown-menu pull-right black lt"></div>
                                                </div>
                                                <div className="item-title text-ellipsis">
                                                    <a href="track.detail.html">Reflection (Deluxe)</a>
                                                </div>
                                                <div className="item-author text-sm text-ellipsis hide">
                                                    <a href="artist.detail.html" className="text-muted">Fifth Harmony</a>
                                                </div>
                                                <div className="item-meta text-sm text-muted">
                                                    <span className="item-meta-category"><a href="browse.html" className="label">Pop</a></span>
                                                    <span className="item-meta-date text-xs">05.05.2016</span>
                                                </div>

                                                <div className="item-except visible-list text-sm text-muted h-2x m-t-sm">
                                                    Quid ad utilitatem tantae pecuniae? Utram tandem linguam nescio? Sed hoc sane concedamus.
                                                </div>

                                                <div className="item-action visible-list m-t-sm">
                                                    <a href="#" className="btn btn-xs white">Edit</a>
                                                    <a href="#" className="btn btn-xs white" data-toggle="modal" data-target="#delete-modal">Delete</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xs-12">
                                        <div className="item r" data-id="item-1" data-src="http://api.soundcloud.com/tracks/269944843/stream?client_id=a10d44d431ad52868f1bce6d36f5234c">
                                            <div className="item-media ">
                                                <a href="track.detail.html" className="item-media-content" style={{backgroundImage: "url('images/b0.jpg')"}}></a>
                                                <div className="item-overlay center">
                                                    <button className="btn-playpause">Play</button>
                                                </div>
                                            </div>
                                            <div className="item-info">
                                                <div className="item-overlay bottom text-right">
                                                    <a href="#" className="btn-favorite"><i className="fa fa-heart-o"></i></a>
                                                    <a href="#" className="btn-more" data-toggle="dropdown"><i className="fa fa-ellipsis-h"></i></a>
                                                    <div className="dropdown-menu pull-right black lt"></div>
                                                </div>
                                                <div className="item-title text-ellipsis">
                                                    <a href="track.detail.html">Pull Up</a>
                                                </div>
                                                <div className="item-author text-sm text-ellipsis hide">
                                                    <a href="artist.detail.html" className="text-muted">Summerella</a>
                                                </div>
                                                <div className="item-meta text-sm text-muted">
                                                    <span className="item-meta-category"><a href="browse.html" className="label">Blue</a></span>
                                                    <span className="item-meta-date text-xs">30.05.2016</span>
                                                </div>

                                                <div className="item-except visible-list text-sm text-muted h-2x m-t-sm">
                                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quamquam tu hanc copiosiorem etiam soles dicere. Nihil illinc huc pervenit.
                                                </div>

                                                <div className="item-action visible-list m-t-sm">
                                                    <a href="#" className="btn btn-xs white">Edit</a>
                                                    <a href="#" className="btn btn-xs white" data-toggle="modal" data-target="#delete-modal">Delete</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <a href="#" className="btn btn-sm white rounded">Show More</a>
                            </div>
                            <div className="tab-pane" id="playlist">
                                <div className="row m-b">
                                    <div className="col-xs-4 col-sm-4 col-md-3">
                                        <div className="item r" data-id="item-2" data-src="http://api.soundcloud.com/tracks/259445397/stream?client_id=a10d44d431ad52868f1bce6d36f5234c">
                                            <div className="item-media ">
                                                <a href="track.detail.html" className="item-media-content" style={{backgroundImage: "url('images/b1.jpg')"}}></a>
                                                <div className="item-overlay center">
                                                    <button className="btn-playpause">Play</button>
                                                </div>
                                            </div>
                                            <div className="item-info">
                                                <div className="item-overlay bottom text-right">
                                                    <a href="#" className="btn-favorite"><i className="fa fa-heart-o"></i></a>
                                                    <a href="#" className="btn-more" data-toggle="dropdown"><i className="fa fa-ellipsis-h"></i></a>
                                                    <div className="dropdown-menu pull-right black lt"></div>
                                                </div>
                                                <div className="item-title text-ellipsis">
                                                    <a href="track.detail.html">Fireworks</a>
                                                </div>
                                                <div className="item-author text-sm text-ellipsis hide">
                                                    <a href="artist.detail.html" className="text-muted">Kygo</a>
                                                </div>
                                                <div className="item-meta text-sm text-muted">
                                                    <span className="item-meta-stats text-xs ">
                                                        <i className="fa fa-play text-muted"></i> 30
                                                        <i className="fa fa-heart m-l-sm text-muted"></i> 10
                                                    </span>
                                                </div>


                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xs-4 col-sm-4 col-md-3">
                                        <div className="item r" data-id="item-10" data-src="http://api.soundcloud.com/tracks/237514750/stream?client_id=a10d44d431ad52868f1bce6d36f5234c">
                                            <div className="item-media ">
                                                <a href="track.detail.html" className="item-media-content" style={{backgroundImage: "url('images/b9.jpg')"}}></a>
                                                <div className="item-overlay center">
                                                    <button className="btn-playpause">Play</button>
                                                </div>
                                            </div>
                                            <div className="item-info">
                                                <div className="item-overlay bottom text-right">
                                                    <a href="#" className="btn-favorite"><i className="fa fa-heart-o"></i></a>
                                                    <a href="#" className="btn-more" data-toggle="dropdown"><i className="fa fa-ellipsis-h"></i></a>
                                                    <div className="dropdown-menu pull-right black lt"></div>
                                                </div>
                                                <div className="item-title text-ellipsis">
                                                    <a href="track.detail.html">The Open Road</a>
                                                </div>
                                                <div className="item-author text-sm text-ellipsis hide">
                                                    <a href="artist.detail.html" className="text-muted">Postiljonen</a>
                                                </div>
                                                <div className="item-meta text-sm text-muted">
                                                    <span className="item-meta-stats text-xs ">
                                                        <i className="fa fa-play text-muted"></i> 860
                                                        <i className="fa fa-heart m-l-sm text-muted"></i> 240
                                                    </span>
                                                </div>


                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xs-4 col-sm-4 col-md-3">
                                        <div className="item r" data-id="item-1" data-src="http://api.soundcloud.com/tracks/269944843/stream?client_id=a10d44d431ad52868f1bce6d36f5234c">
                                            <div className="item-media ">
                                                <a href="track.detail.html" className="item-media-content" style={{backgroundImage: "url('images/b0.jpg')"}}></a>
                                                <div className="item-overlay center">
                                                    <button className="btn-playpause">Play</button>
                                                </div>
                                            </div>
                                            <div className="item-info">
                                                <div className="item-overlay bottom text-right">
                                                    <a href="#" className="btn-favorite"><i className="fa fa-heart-o"></i></a>
                                                    <a href="#" className="btn-more" data-toggle="dropdown"><i className="fa fa-ellipsis-h"></i></a>
                                                    <div className="dropdown-menu pull-right black lt"></div>
                                                </div>
                                                <div className="item-title text-ellipsis">
                                                    <a href="track.detail.html">Pull Up</a>
                                                </div>
                                                <div className="item-author text-sm text-ellipsis hide">
                                                    <a href="artist.detail.html" className="text-muted">Summerella</a>
                                                </div>
                                                <div className="item-meta text-sm text-muted">
                                                    <span className="item-meta-stats text-xs ">
                                                        <i className="fa fa-play text-muted"></i> 3200
                                                        <i className="fa fa-heart m-l-sm text-muted"></i> 210
                                                    </span>
                                                </div>


                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>*/}
              <div className="tab-pane" id="like">
                <form>
                  <div className="form-group row">
                    <div className="col-sm-3 form-control-label text-muted">Current Password</div>
                    <div className="col-sm-9">
                      <input
                        className="form-control"
                        type="password"
                        value={stateData.current_password}
                        name="current_password"
                        id="current_password"
                        onChange={(e) => props.changevalue(e)}
                      />
                      {stateData.error && stateData.error.current_password && (
                        <p className="error">
                          {stateData.error
                            ? stateData.error.current_password
                              ? stateData.error.current_password
                              : ''
                            : ''}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="col-sm-3 form-control-label text-muted">New Password</div>
                    <div className="col-sm-9">
                      <input
                        className="form-control"
                        type="password"
                        value={stateData.new_password}
                        name="new_password"
                        id="new_password"
                        onChange={(e) => props.changevalue(e)}
                      />
                      {stateData.error && stateData.error.new_password && (
                        <p className="error">
                          {stateData.error
                            ? stateData.error.new_password
                              ? stateData.error.new_password
                              : ''
                            : ''}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="col-sm-3 form-control-label text-muted">Confirm Password</div>
                    <div className="col-sm-9">
                      <input
                        className="form-control"
                        type="password"
                        value={stateData.cpassword}
                        name="cpassword"
                        id="cpassword"
                        onChange={(e) => props.changevalue(e)}
                      />
                      {stateData.error && stateData.error.cpassword && (
                        <p className="error">
                          {stateData.error
                            ? stateData.error.cpassword
                              ? stateData.error.cpassword
                              : ''
                            : ''}
                        </p>
                      )}
                    </div>
                  </div>
                </form>
                <button
                  type="button"
                  className="btn btn-primary pull-right"
                  onClick={() => props.updatePassword()}
                >
                  UPDATE
                </button>
              </div>
              <div className="tab-pane active" id="profile">
                <form>
                  <div className="form-group row">
                    <div className="col-sm-3 form-control-label text-muted">Name</div>
                    <div className="col-sm-9">
                      <input
                        className="form-control"
                        value={stateData.name}
                        name="name"
                        id="name"
                        onChange={(e) => props.changevalue(e)}
                      />
                      {stateData.error && stateData.error.name && (
                        <p className="error">
                          {stateData.error
                            ? stateData.error.name
                              ? stateData.error.name
                              : ''
                            : ''}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="col-sm-3 form-control-label text-muted">Username</div>
                    <div className="col-sm-9">
                      <input
                        className="form-control"
                        disabled
                        value={stateData.username}
                        name="username"
                        id="username"
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="col-sm-3 form-control-label text-muted">Email</div>
                    <div className="col-sm-9">
                      <input
                        className="form-control"
                        disabled
                        value={stateData.email}
                        name="email"
                        id="email"
                      />
                    </div>
                  </div>
                </form>
                <button
                  type="button"
                  className="btn btn-primary pull-right"
                  onClick={() => props.updateUserProfile()}
                >
                  SAVE
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="col-lg-3 w-xxl w-auto-md">
                    <div className="padding" style={{bottom: "60px"}} data-ui-jp="stick_in_parent">
                        <h6 className="text text-muted">5 Likes</h6>
                        <div className="row item-list item-list-sm m-b">
                            <div className="col-xs-12">
                                <div className="item r" data-id="item-3" data-src="http://api.soundcloud.com/tracks/79031167/stream?client_id=a10d44d431ad52868f1bce6d36f5234c">
                                    <div className="item-media ">
                                        <a href="track.detail.html" className="item-media-content" style={{backgroundImage: "url('images/b2.jpg')"}}></a>
                                    </div>
                                    <div className="item-info">
                                        <div className="item-title text-ellipsis">
                                            <a href="track.detail.html">I Wanna Be In the Cavalry</a>
                                        </div>
                                        <div className="item-author text-sm text-ellipsis ">
                                            <a href="artist.detail.html" className="text-muted">Jeremy Scott</a>
                                        </div>


                                    </div>
                                </div>
                            </div>
                            <div className="col-xs-12">
                                <div className="item r" data-id="item-1" data-src="http://api.soundcloud.com/tracks/269944843/stream?client_id=a10d44d431ad52868f1bce6d36f5234c">
                                    <div className="item-media ">
                                        <a href="track.detail.html" className="item-media-content" style={{backgroundImage: "url('images/b0.jpg')"}}></a>
                                    </div>
                                    <div className="item-info">
                                        <div className="item-title text-ellipsis">
                                            <a href="track.detail.html">Pull Up</a>
                                        </div>
                                        <div className="item-author text-sm text-ellipsis ">
                                            <a href="artist.detail.html" className="text-muted">Summerella</a>
                                        </div>


                                    </div>
                                </div>
                            </div>
                            <div className="col-xs-12">
                                <div className="item r" data-id="item-12" data-src="http://api.soundcloud.com/tracks/174495152/stream?client_id=a10d44d431ad52868f1bce6d36f5234c">
                                    <div className="item-media ">
                                        <a href="track.detail.html" className="item-media-content" style={{backgroundImage: "url('images/b11.jpg')"}}></a>
                                    </div>
                                    <div className="item-info">
                                        <div className="item-title text-ellipsis">
                                            <a href="track.detail.html">Happy ending</a>
                                        </div>
                                        <div className="item-author text-sm text-ellipsis ">
                                            <a href="artist.detail.html" className="text-muted">Postiljonen</a>
                                        </div>


                                    </div>
                                </div>
                            </div>
                            <div className="col-xs-12">
                                <div className="item r" data-id="item-11" data-src="http://api.soundcloud.com/tracks/218060449/stream?client_id=a10d44d431ad52868f1bce6d36f5234c">
                                    <div className="item-media ">
                                        <a href="track.detail.html" className="item-media-content" style={{backgroundImage: "url('images/b10.jpg')"}}></a>
                                    </div>
                                    <div className="item-info">
                                        <div className="item-title text-ellipsis">
                                            <a href="track.detail.html">Spring</a>
                                        </div>
                                        <div className="item-author text-sm text-ellipsis ">
                                            <a href="artist.detail.html" className="text-muted">Pablo Nouvelle</a>
                                        </div>


                                    </div>
                                </div>
                            </div>
                            <div className="col-xs-12">
                                <div className="item r" data-id="item-6" data-src="http://api.soundcloud.com/tracks/236107824/stream?client_id=a10d44d431ad52868f1bce6d36f5234c">
                                    <div className="item-media ">
                                        <a href="track.detail.html" className="item-media-content" style={{backgroundImage: "url('images/b5.jpg')"}}></a>
                                    </div>
                                    <div className="item-info">
                                        <div className="item-title text-ellipsis">
                                            <a href="track.detail.html">Body on me</a>
                                        </div>
                                        <div className="item-author text-sm text-ellipsis ">
                                            <a href="artist.detail.html" className="text-muted">Rita Ora</a>
                                        </div>


                                    </div>
                                </div>
                            </div>
                        </div>
                        <h6 className="text text-muted">Go mobile</h6>
                        <div className="btn-groups">
                            <a href="" className="btn btn-sm dark lt m-r-xs" style={{width: "135px"}}>
                                <span className="pull-left m-r-sm">
                                    <i className="fa fa-apple fa-2x"></i>
                                </span>
                                <span className="clear text-left l-h-1x">
                                    <span className="text-muted text-xxs">Download on the</span>
                                    <b className="block m-b-xs">App Store</b>
                                </span>
                            </a>
                            <a href="" className="btn btn-sm dark lt" style={{width: "133px"}}>
                                <span className="pull-left m-r-sm">
                                    <i className="fa fa-play fa-2x"></i>
                                </span>
                                <span className="clear text-left l-h-1x">
                                    <span className="text-muted text-xxs">Get it on</span>
                                    <b className="block m-b-xs m-r-xs">Google Play</b>
                                </span>
                            </a>
                        </div>
                        <div className="b-b m-y"></div>
                        <div className="nav text-sm _600">
                            <a href="#" className="nav-link text-muted m-r-xs">About</a>
                            <a href="#" className="nav-link text-muted m-r-xs">Contact</a>
                            <a href="#" className="nav-link text-muted m-r-xs">Legal</a>
                            <a href="#" className="nav-link text-muted m-r-xs">Policy</a>
                        </div>
                        <p className="text-muted text-xs p-b-lg">&copy; Copyright 2016</p>
                    </div>
                </div> */}
      </div>
    </>
  );
}
