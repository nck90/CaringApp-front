// app/api/institution/institution.types.js

/**
 * @typedef InstitutionAddress
 * @property {string} city
 * @property {string} street
 * @property {string} zipCode
 */

/**
 * @typedef InstitutionLocation
 * @property {number} latitude
 * @property {number} longitude
 */

/**
 * @typedef InstitutionPriceInfo
 * @property {number} monthlyBaseFee
 * @property {number} admissionFee
 * @property {number} monthlyMealCost
 * @property {string} priceNotes
 */

/**
 * @typedef InstitutionBasic
 * @property {number} id
 * @property {string} name
 * @property {string} institutionType
 * @property {boolean} isAdmissionAvailable
 * @property {number} bedCount
 * @property {string} openingHours
 * @property {InstitutionAddress} address
 * @property {InstitutionLocation} location
 * @property {InstitutionPriceInfo} priceInfo
 */

/**
 * @typedef InstitutionListItem
 * @property {number} id
 * @property {string} name
 * @property {string} institutionType
 * @property {boolean} isAdmissionAvailable
 * @property {string} city
 * @property {string} street
 * @property {string} zipCode
 * @property {number} distanceKm
 * @property {number} monthlyBaseFee
 */

/**
 * @typedef InstitutionListResponse
 * @property {InstitutionListItem[]} content
 * @property {number} totalElements
 * @property {number} totalPages
 * @property {number} pageSize
 * @property {number} currentPage
 * @property {boolean} last
 */

/**
 * @typedef InstitutionDetailResponse
 * @property {string} name
 * @property {string} institutionType
 * @property {string} phoneNumber
 * @property {string} approvalStatus
 * @property {boolean} isAdmissionAvailable
 * @property {number} bedCount
 * @property {string} openingHours
 * @property {InstitutionAddress} address
 * @property {InstitutionLocation} location
 * @property {InstitutionPriceInfo} priceInfo
 */
